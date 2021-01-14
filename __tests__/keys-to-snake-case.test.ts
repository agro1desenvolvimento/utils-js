import { keysToSnakeCase } from '../src/index';

describe('keys To snake case', () => {
  describe('should convert', () => {
    it('simple object', () => {
      const fakeData = keysToSnakeCase({ CamelCase: true });

      expect(fakeData).toEqual({ camel_case: true });
    });

    it('should convert just the first key', () => {
      const fakeData = keysToSnakeCase({
        CamelCase: [
          { CamelCaseTest: '' },
        ],
      });

      expect(fakeData).toEqual({
        camel_case: [
          { CamelCaseTest: '' },
        ],
      });
    });
  });

  describe('should not convert', () => {
    it('should do nothing', () => {
      const fakeData = keysToSnakeCase({});

      expect(fakeData).toEqual({});
    });

    it('should do nothing', () => {
      const fakeData = keysToSnakeCase([]);

      expect(fakeData).toEqual([]);
    });

    it('should leave the object as it is', () => {
      const fakeData = keysToSnakeCase([{ key: [{ keyDeep: 'v' }] }]);

      expect(fakeData).toEqual([{ key: [{ keyDeep: 'v' }] }]);
    });
  });
});
