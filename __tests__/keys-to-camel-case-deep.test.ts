import { keysToCamelCaseDeep } from '../src/index';

describe('keys To snake case', () => {
  describe('should convert', () => {
    it('simple object', () => {
      const fakeData = keysToCamelCaseDeep({ camel_case: true });

      expect(fakeData).toEqual({ camelCase: true });
    });

    it('should convert all keys', () => {
      const fakeData = keysToCamelCaseDeep({
        camel_case:
        { camel_case_test: '' },
      });

      expect(fakeData).toEqual({
        camelCase:
        { camelCaseTest: '' },
      });
    });

    it('should convert all keys inside the array', () => {
      const fakeData = keysToCamelCaseDeep({
        camel_case: [
          { camel_case_test: '' },
        ],
      });

      expect(fakeData).toEqual({
        camelCase: [
          { camelCaseTest: '' },
        ],
      });
    });
  });

  describe('should not convert', () => {
    it('empty object', () => {
      const fakeData = keysToCamelCaseDeep({});

      expect(fakeData).toEqual({});
    });

    it('empty array', () => {
      const fakeData = keysToCamelCaseDeep([]);

      expect(fakeData).toEqual([]);
    });

    it('should leave the object as it is', () => {
      const fakeData = keysToCamelCaseDeep([{ key: [{ keyDeep: 'v' }] }]);

      expect(fakeData).toEqual([{ key: [{ keyDeep: 'v' }] }]);
    });
  });
});
