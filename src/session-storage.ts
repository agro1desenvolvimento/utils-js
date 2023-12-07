import StorageBase, { ParseToJSON, ParseToString } from './store-base';

class SessionStorage<T extends Record<string, any>> extends StorageBase<T> {
  constructor(parseToString?: ParseToString<T>, parseToJSON?: ParseToJSON<T>) {
    super({ type: 'session', parseToJSON, parseToString });
  }
}

export default SessionStorage;
