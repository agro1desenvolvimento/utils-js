import { keysToSnakeCase } from '../src/index';

test('keys should be in snake case', () =>{
  const fakeData = keysToSnakeCase({ CamelCase: true });

  expect(fakeData).toEqual({ 'camel_case': true });
});
