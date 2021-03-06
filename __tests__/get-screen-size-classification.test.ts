import { getScreenSizeClassification } from '../src';

const originalWidth = global.innerWidth;

afterEach(() => {
  global.innerWidth = originalWidth;
});

const validate = (data: { min: number, max: number, classification: string }) => {
  it('min screen size', () => {
    global.innerWidth = data.min;

    expect(getScreenSizeClassification()).toBe(data.classification);
  });

  it('max screen size', () => {
    global.innerWidth = data.max;

    expect(getScreenSizeClassification()).toBe(data.classification);
  });
};

describe('get-screen-size-classification', () => {
  describe('xs', () => {
    validate({ min: 0, max: 575, classification: 'xs' });
  });

  describe('sm', () => {
    validate({ min: 576, max: 767, classification: 'sm' });
  });

  describe('md', () => {
    validate({ min: 768, max: 991, classification: 'md' });
  });

  describe('lg', () => {
    validate({ min: 992, max: 1199, classification: 'lg' });
  });

  describe('xl', () => {
    validate({ min: 1200, max: 1399, classification: 'xl' });
  });

  describe('xxl', () => {
    validate({ min: 1400, max: Infinity, classification: 'xxl' });
  });
});
