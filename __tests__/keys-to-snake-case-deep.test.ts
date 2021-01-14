import { keysToSnakeCaseDeep } from '../src/index';

describe('keys To snake case', () => {
  describe('should convert', () => {
    it('simple object', () => {
      const fakeData = keysToSnakeCaseDeep({ camelCase: true });

      expect(fakeData).toEqual({ camel_case: true });
    });

    it('should convert all keys', () => {
      const fakeData = keysToSnakeCaseDeep({
        camelCase:
        { camelCaseTest: '' },
      });

      expect(fakeData).toEqual({
        camel_case:
        { camel_case_test: '' },
      });
    });

    it('should convert all keys inside the array', () => {
      const fakeData = keysToSnakeCaseDeep({
        camelCase: [
          { camelCaseTest: '' },
        ],
      });

      expect(fakeData).toEqual({
        camel_case: [
          { camel_case_test: '' },
        ],
      });
    });
  });

  describe('should not convert', () => {
    it('empty object', () => {
      const fakeData = keysToSnakeCaseDeep({});

      expect(fakeData).toEqual({});
    });

    it('empty array', () => {
      const fakeData = keysToSnakeCaseDeep([]);

      expect(fakeData).toEqual([]);
    });

    it('should leave the object as it is', () => {
      const fakeData = keysToSnakeCaseDeep([{ key: [{ key_deep: 'v' }] }]);

      expect(fakeData).toEqual([{ key: [{ key_deep: 'v' }] }]);
    });
  });
});
