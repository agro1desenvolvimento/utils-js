import { getDeviceTypeByScreen } from '../src';

const originalWidth = global.innerWidth;

afterEach(() => {
  global.innerWidth = originalWidth;
});
const validate = (data: { width: number, deviceType: string }) => {
  global.innerWidth = data.width;

  expect(getDeviceTypeByScreen()).toBe(data.deviceType);
};

describe('getDeviceTypeByScreen', () => {
  it('phone', () => {
    validate({ deviceType: 'phone', width: 767 });
  });

  it('tablet', () => {
    validate({ deviceType: 'tablet', width: 768 });
  });

  it('desktop', () => {
    validate({ deviceType: 'desktop', width: 992 });
  });
});
