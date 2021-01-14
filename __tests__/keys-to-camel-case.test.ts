import { keysToCamelCase } from '../src/index';

describe('keys To snake case', () => {
  describe('should convert', () => {
    it('simple object', () => {
      const fakeData = keysToCamelCase({ camel_case: true });

      expect(fakeData).toEqual({ camelCase: true });
    });

    it('should convert just the first key', () => {
      const fakeData = keysToCamelCase({
        camel_case: [
          { camel_case_test: '' },
        ],
      });

      expect(fakeData).toEqual({
        camelCase: [
          { camel_case_test: '' },
        ],
      });
    });
  });

  describe('should not convert', () => {
    it('should do nothing', () => {
      const fakeData = keysToCamelCase({});

      expect(fakeData).toEqual({});
    });

    // it('should do nothing', () => {
    //   const fakeData = keysToCamelCase([]);

    //   expect(fakeData).toEqual([]);
    // })
  });
});
