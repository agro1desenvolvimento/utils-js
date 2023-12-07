import { LocalStorage } from '../src/index';

const localStorage = new LocalStorage();
const KEY = 'foo';
const VALUE = 'bar';

describe('localStorage', () => {
  describe('setItem', () => {
    it('should save to localStorage', () => {
      // @ts-expect-error
      const spyParseToString = jest.spyOn(localStorage, 'parseToString');

      localStorage.setItem(KEY, VALUE);

      expect(localStorage.getItem(KEY)).toBe(VALUE);
      expect(spyParseToString).toBeCalledTimes(1);
    });

    it('should get the length', () => {
      expect(localStorage.length).toEqual(1);
    });

    it('should get all keys', () => {
      expect(Object.keys(localStorage.getAllKeys()).length).toBe(1);
    });

    it('should remove the key', () => {
      localStorage.removeItem(KEY);
      expect(Object.keys(localStorage.getAllKeys()).length).toBe(0);
    });

    it('should clear', () => {
      localStorage.setItem(KEY, VALUE);
      expect(localStorage.getItem(KEY)).toBe(VALUE);
      localStorage.clear();
      expect(localStorage.length).toEqual(0);
    });

    it('should parse to String', () => {
      // @ts-expect-error
      const fakeData = localStorage.parseToString({ test: true });

      expect(fakeData).toEqual('{"test":true}');
    });

    it('should parse to JSON', () => {
      // @ts-expect-error
      const fakeData = localStorage.parseToJSON('{"test":{"string":true}}');

      expect(fakeData).toEqual({ test: { string: true } });
    });

    it('should emit event', () => {
      const onChange = jest.fn();
      localStorage.addOnChange(onChange);

      localStorage.setItem(KEY, VALUE);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith({ action: 'update', value: VALUE, key: KEY });
    });
  });
});
