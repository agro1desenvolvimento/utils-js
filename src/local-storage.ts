import StorageBase, { ParseToJSON, ParseToString } from './store-base';

class LocalStorage<T extends Record<string, any>> extends StorageBase<T> {
  constructor(parseToString?: ParseToString, parseToJSON?: ParseToJSON) {
    super({ type: 'local', parseToJSON, parseToString });
  }
}

export default LocalStorage;
