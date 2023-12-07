import { SessionStorage } from '../src/index';

const sessionStorage = new SessionStorage();
const KEY = 'foo';
const VALUE = 'bar';

describe('sessionStorage', () => {
  describe('setItem', () => {
    it('should save to sessionStorage', () => {
      // @ts-expect-error
      const spyParseToString = jest.spyOn(sessionStorage, 'parseToString');

      sessionStorage.setItem(KEY, VALUE);
      expect(sessionStorage.getItem(KEY)).toBe(VALUE);
      expect(spyParseToString).toBeCalledTimes(1);
    });

    it('should get the length', () => {
      expect(sessionStorage.length).toEqual(1);
    });

    it('should get all keys', () => {
      expect(Object.keys(sessionStorage.getAllKeys()).length).toBe(1);
    });

    it('should remove the key', () => {
      sessionStorage.removeItem(KEY);
      expect(Object.keys(sessionStorage.getAllKeys()).length).toBe(0);
    });

    it('should clear', () => {
      sessionStorage.setItem(KEY, VALUE);
      expect(sessionStorage.getItem(KEY)).toBe(VALUE);
      sessionStorage.clear();
      expect(sessionStorage.length).toEqual(0);
    });

    it('should parse to String', () => {
      // @ts-expect-error
      const fakeData = sessionStorage.parseToString({ test: true });

      expect(fakeData).toEqual('{"test":true}');
    });

    it('should parse to JSON', () => {
      // @ts-expect-error
      const fakeData = sessionStorage.parseToJSON('{"test":{"string":true}}');

      expect(fakeData).toEqual({ test: { string: true } });
    });
  });

  it('should emit event', () => {
    const onChange = jest.fn();
    sessionStorage.addOnChange(onChange);

    sessionStorage.setItem(KEY, VALUE);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({ action: 'update', value: VALUE, key: KEY });
  });
});
