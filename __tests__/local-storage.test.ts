import { LocalStorage } from '../src/index';

const localStorage = new LocalStorage();

test('should save to localStorage', () => {
  localStorage.clear

  const KEY = 'foo',
    VALUE = 'bar';
  
  localStorage.setItem(KEY, VALUE);

  expect(localStorage.getItem(KEY)).toBe(VALUE);
  expect(Object.keys(localStorage.getAllKeys()).length).toBe(1);
  localStorage.removeItem(KEY);
});

test('should be empty', () => {
  expect(Object.keys(localStorage.getAllKeys()).length).toBe(0);
});