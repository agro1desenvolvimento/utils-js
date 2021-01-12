import { keysToCamelCaseDeep } from '../src/index';

test('keys should be in camel case', () =>{
  const fakeData = keysToCamelCaseDeep({ 
    snake_case: {
      more_snake: {
        even_more_snake: true
      }
    }
  });

  expect(fakeData).toEqual({ 
    snakeCase: {
      moreSnake: {
        evenMoreSnake: true
      }
    }
  });
});
