/* eslint-disable class-methods-use-this */
class LocalStorage<T extends Record<keyof any, unknown>> {
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

  clear() {
    localStorage.clear();
  }

  get length() {
    return localStorage.length;
  }

  getAllKeys = () => Object.keys(localStorage) as (keyof T)[];

  getItem<K extends keyof T>(key: K) {
    const value = localStorage.getItem(key.toString());

    return this.parseToJSON<K>(value);
  }

  setItem<K extends keyof T>(key: K, value: T[K]) {
    return localStorage.setItem(key.toString(), this.parseToString(value));
  }

  removeItem = (key: keyof T) => localStorage.removeItem(key.toString());
}

export default LocalStorage;
