import { keysToSnakeCaseDeep } from '../src/index';

test('keys should be in snake case', () =>{
  const fakeData = keysToSnakeCaseDeep({ 
    camelCase: {
      moreCamel: {
        evenMoreCamel: true
      }
    }
  });

  expect(fakeData).toEqual({ 
    camel_case: {
      more_camel: {
        even_more_camel: true
      }
    }
  });
});
