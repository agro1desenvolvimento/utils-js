import { mapDeep } from '../src/index';

describe('mapDeep', () => {
  it('should map the object and change the key', () => {
    let data = { test: 'test' };

    data = mapDeep(data, () => ({ key: 'testWorked' }), 0);
    expect(data).toHaveProperty('testWorked');
  });

  it('should set key to "undefined" ', () => {
    let data = { test: 'test' };

    data = mapDeep(data, () => ({ key: undefined }), 0);
    expect(data).toHaveProperty('undefined');
  });

  it('should map th object and change the value', () => {
    let data = { test: 'test' };

    data = mapDeep(data, () => ({ value: 'testWorked' }), 0);
    expect(data.test).toEqual('testWorked');
  });

  it('should set value to undefined ', () => {
    let data = { test: 'test' };

    data = mapDeep(data, () => ({ value: undefined }), 0);
    expect(data.test).toEqual(undefined);
  });
});
