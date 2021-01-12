import { keysToCamelCase } from '../src/index';

test('keys should be in camel case', () =>{
  const fakeData = keysToCamelCase({ snake_case: true });

  expect(fakeData).toEqual({ 'snakeCase': true });
});
