/* eslint-disable key-spacing */
export const DEFAULT_MENU_CONFIG = {
  'julia set': {
    menuOrder: ['colorset', 'brightness', 'speed', 'exponent', 'supersamples'],
    controls: {
      brightness: { type: 'range', min: 1, max: 8 },
      colorset: { type: 'select', options: ['linear', 'squared periodic'] },
      exponent: { type: 'range', min: 0, max: 10 },
      speed: { type: 'range', min: 0, max: 320 },
      supersamples: { type: 'select', options: { 1: '1x', 4: '4x', 16: '16x' } }
    }
  },
  'mandelbrot set': {
    menuOrder: ['colorset', 'brightness', 'exponent', 'supersamples'],
    controls: {
      brightness:   { type: 'range', min: 1, max: 8 },
      exponent:     { type: 'range', min: 0, max: 10 },
      colorset:     { type: 'select', options: ['linear', 'squared periodic'] },
      supersamples: { type: 'select', options: { 1: '1x', 4: '4x', 16: '16x' } }
    }
  },
  'burning ship': {
    menuOrder: ['colorset', 'brightness', 'exponent', 'supersamples'],
    controls: {
      brightness:   { type: 'range', min: 1, max: 8 },
      exponent:     { type: 'range', min: 0, max: 10 },
      colorset:     { type: 'select', options: ['linear', 'squared periodic'] },
      supersamples: { type: 'select', options: { 1: '1x', 4: '4x', 16: '16x' } }
    }
  },
  'modified collatz': {
    menuOrder: ['depth', 'constant_1', 'angle1', 'angle2', 'supersamples'],
    controls: {
      depth:      { type: 'range', min: 1, max: 800 },
      constant_1: { type: 'range', min: 1, max: 10 },
      angle1:     { type: 'range', min: 0, max: Math.PI * 2 },
      angle2:     { type: 'range', min: 0, max: Math.PI * 2 },
      supersamples: { type: 'select', options: { 1: '1x', 4: '4x', 16: '16x' } }
    }
  },
  'box thing': {
    menuOrder: ['rotation'],
    controls: {
      rotation: { type: 'range', min: 0, max: 3 * Math.PI }
    }
  }
}

export const DEFAULT_STORE = {
  'julia set': {
    config: {
      brightness: 4,
      colorset: 0,
      exponent: 2,
      speed: 16,
      supersamples: 1
    },
    viewport: {
      center: { x: 0, y: 0 },
      range: { x: 4, y: 4 }
    }
  },
  'mandelbrot set': {
    config: {
      brightness: 4,
      colorset: 0,
      exponent: 2,
      supersamples: 1
    },
    viewport: {
      center: { x: 0, y: 0 },
      range: { x: 4, y: 4 }
    }
  },
  'burning ship': {
    config: {
      brightness: 4,
      colorset: 0,
      exponent: 2,
      supersamples: 1
    },
    viewport: {
      center: { x: 0, y: 0 },
      range: { x: 4, y: 4 }
    }
  },
  'modified collatz': {
    config: {
      depth: 200,
      constant_1: 4,
      angle1: Math.PI,
      angle2: Math.PI
    },
    viewport: {
      center: { x: 0, y: 0 },
      range: { x: 100, y: 100 }
    }
  },
  'box thing': {
    config: {
      rotation: 0
    },
    viewport: {
      center: { x: 0.25, y: 0.25 },
      range: { x: 1, y: 1 }
    }
  }
}

export const FRACTAL_ENUM = {
  'julia set': 0,
  'mandelbrot set': 1,
  'burning ship': 2,
  'modified collatz': 3,
  'box thing': 4
}
