import { isMobile } from '../src';

const originalWidth = global.innerWidth;

afterEach(() => {
  global.innerWidth = originalWidth;
});

describe('isMobile', () => {
  it('if is phone', () => {
    global.innerWidth = 700;
    expect(isMobile()).toBeTruthy();
  });

  it('if is tablet', () => {
    global.innerWidth = 900;
    expect(isMobile()).toBeTruthy();
  });

  it('if is desktop', () => {
    global.innerWidth = 1000;
    expect(isMobile()).toBeFalsy();
  });
});
