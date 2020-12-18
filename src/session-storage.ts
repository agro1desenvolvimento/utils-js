class SessionStorage<T extends Record<keyof any, unknown>> {
  constructor(
    parseToString?: (v: T[keyof T]) => string,
    parseToJSON?: <K extends keyof T>(value: string | null) => T[K] | null,
  ) {
    if (parseToString) this.parseToString = parseToString;
    if (parseToJSON) this.parseToJSON = parseToJSON;
  }

  private parseToString = JSON.stringify;

  private parseToJSON = <K extends keyof T>(value: string | null): T[K] | null => {
    try {
      if (typeof value === 'string') return JSON.parse(value);

      return value;
    } catch (error) {
      return value as T[K];
    }
  }

  clear = sessionStorage.clear;

  length = sessionStorage.length;

  getAllKeys = () => Object.keys(sessionStorage) as (keyof T)[];

  getItem<K extends keyof T>(key: K) {
    const value = sessionStorage.getItem(key.toString());

    return this.parseToJSON<K>(value);
  }

  setItem<K extends keyof T>(key: K, value: T[K]) {
    return sessionStorage.setItem(key.toString(), this.parseToString(value));
  }

  removeItem = (key: keyof T) => sessionStorage.removeItem(key.toString());
}

export default SessionStorage;
