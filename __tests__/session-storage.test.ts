import { SessionStorage } from '../src/index';

const sessionStorage = new SessionStorage();
const KEY = 'foo';
const VALUE = 'bar';

describe('sessionStorage', () => {
  describe('setItem', () => {
    it('should save to sessionStorage', () => {
      sessionStorage.setItem(KEY, VALUE);
      expect(sessionStorage.getItem(KEY)).toBe(VALUE);
    });

    it('should get all keys', () => {
      expect(Object.keys(sessionStorage.getAllKeys()).length).toBe(1);
    });

    it('should remove the key', () => {
      sessionStorage.removeItem(KEY);
      expect(Object.keys(sessionStorage.getAllKeys()).length).toBe(0);
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
});
