import { SessionStorage } from '../src/index';

const sessionStorage = new SessionStorage();

test('should save to sessionStorage', () => {
  sessionStorage.clear

  const KEY = 'foo',
    VALUE = 'bar';
  
  sessionStorage.setItem(KEY, VALUE);

  expect(sessionStorage.getItem(KEY)).toBe(VALUE);
  expect(Object.keys(sessionStorage.getAllKeys()).length).toBe(1);
  sessionStorage.removeItem(KEY);
});

test('should be empty', () => {
  expect(Object.keys(sessionStorage.getAllKeys()).length).toBe(0);
});