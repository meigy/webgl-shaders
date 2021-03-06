precision highp float;

uniform vec2 RESOLUTION;
uniform vec2 CENTER;
uniform vec2 RANGE;
uniform vec2 JULIA_C;
uniform vec2 MSAA_COORDINATES[16];

uniform float FRACTAL;
uniform float ROTATION;
uniform float BRIGHTNESS;
uniform float COLORSET;
uniform float EXPONENT;
uniform float SUPERSAMPLES;

const int MAX_ITERATIONS = 255;
const float pi = 3.1415926;

vec2 PIXEL_SIZE = RANGE / RESOLUTION;
float ASPECT_RATIO = RESOLUTION.x / RESOLUTION.y;

float amd_atan (float y, float x) {
  /* this was written to make AMD cards happy */

  float theta;
  if (x == 0.0) {
    theta = pi / 2.0 * sign(y);
  } else {
    theta = atan(y, x);
  }

  return theta;
}

vec2 lazy_cpow(vec2 z, float exponent) {
  /* lazy because the exponent is always real */

  float magnitude = pow(length(z), exponent);
  float argument = amd_atan(z.y, z.x) * exponent;

  return vec2(
    magnitude * cos(argument),
    magnitude * sin(argument)
  );
}

vec2 fractal(vec2 c, vec2 z) {
  for (int iteration = 0; iteration < MAX_ITERATIONS; iteration++) {

    // z <- z^2 + c
    z = lazy_cpow(abs(z), EXPONENT) + c;

    float magnitude = length(z);
    if (magnitude > 2.0) {
      return vec2(float(iteration), magnitude);
    }
  }

  return vec2(0.0, 0.0);
}

vec4 colorize(vec2 fractalValue) {
  float depth = fractalValue.x / 4.0;
  float value = pow(fractalValue.y, 2.0) / 4.0;

  float mu = (depth - log(log(sqrt(value))) / log(2.0));

  mu = sin(mu / 20.0) * sin(mu / 20.0);

  return vec4(mu, mu, mu, 1.0);
}

vec2 rotate2D(vec2 point, vec2 center, float rotation) {
  vec2 delta = point - center;

  float magnitude = length(delta);
  float angle = atan(delta.y, delta.x);

  return center + vec2(
    magnitude * cos(angle + rotation),
    magnitude * sin(angle + rotation)
  );
}

vec2 fragCoordToXY(vec4 fragCoord) {
  vec2 relativePosition = fragCoord.xy / RESOLUTION;

  vec2 cartesianPosition = CENTER + (relativePosition - 0.5) * RANGE;

  return rotate2D(cartesianPosition, CENTER, ROTATION);
}

vec2 msaa(vec2 coordinate) {
  vec2 fractalValue = vec2(0.0, 0.0);

  for (int index = 0; index < 16; index++) {
    vec2 msaaCoordinate = coordinate + PIXEL_SIZE * MSAA_COORDINATES[index];

    fractalValue += fractal(msaaCoordinate, msaaCoordinate);

    if (SUPERSAMPLES <= float(index + 1)) {
      return fractalValue / SUPERSAMPLES;
    }
  }

  return fractalValue / 16.0;
}

void main() {
  vec2 coordinate = fragCoordToXY(gl_FragCoord);

  vec2 fractalValue = msaa(coordinate);

  if (COLORSET == 0.0) {
    float color = BRIGHTNESS * fractalValue.x / float(MAX_ITERATIONS);
    gl_FragColor = vec4(color, color, color, 1.0);
  } else if (COLORSET == 1.0) {
    gl_FragColor = BRIGHTNESS * colorize(fractalValue);
  }
}
