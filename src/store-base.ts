import EventsManager, { EventCallbackBase } from './events-manager';

const STORAGES = {
  session: sessionStorage,
  local: localStorage,
};

type EventOnChangeBySet<T> = {
  [key in keyof T]: {
    action: 'update',
    key: key,
    value: T[key] | null
   }
}[keyof T]

type EventOnChangeByClear = {
  action: 'clear',
}

type EventOnChange<T> = EventOnChangeBySet<T> | EventOnChangeByClear

type Events<T extends Record<string, any>> = {
  onChange: EventOnChange<T>
}

class StorageBase<T extends Record<string, any>> {
  private readonly eventsManager = new EventsManager<Events<T>>()

  protected readonly storage: Storage;

  constructor({ type, parseToJSON, parseToString }: StorageBaseConstructorParam<T>) {
    if (parseToString) this.parseToString = parseToString;
    if (parseToJSON) this.parseToJSON = parseToJSON;

    this.storage = STORAGES[type];
  }

  get length() {
    return this.storage.length;
  }

  clear() {
    this.storage.clear();
    this.emitOnChange('clear');
  }

  getAllKeys = () => Object.keys(this.storage) as (keyof T)[];

  getItem<K extends keyof T>(key: K) {
    const value = this.storage.getItem(key.toString());

    return this.parseToJSON<K>(value);
  }

  setItem<K extends keyof T>(key: K, value: T[K]) {
    const newValue = this.parseToString(value);
    const currentValue = this.storage.getItem(key.toString());

    if (currentValue === newValue) return;

    this.storage.setItem(key.toString(), newValue);
    this.emitOnChange('update', key);
  }

  removeItem = (key: keyof T) => {
    const keyRegistered = this.getAllKeys().includes(key);

    if (!keyRegistered) return;

    this.storage.removeItem(key.toString());
    this.emitOnChange('update', key);
  };

  addOnChange = (callback: OnStorageChange<T>) => {
    this.eventsManager.add('onChange', callback);

    this.updateNativeStorageListener();

    return () => {
      this.removeOnChange(callback);
    };
  }

  removeOnChange = (callback: OnStorageChange<T>) => {
    this.eventsManager.remove('onChange', callback);

    this.updateNativeStorageListener();
  }

  private parseToString = JSON.stringify;

  private parseToJSON: ParseToJSON<T> = (value) => {
    try {
      if (typeof value === 'string') return JSON.parse(value);

      return value;
    } catch (error) {
      return value;
    }
  }

  private emitOnChange(action: 'update', key: keyof T): void

  private emitOnChange(action: 'clear'): void

  private emitOnChange(action: 'update' | 'clear', key?: keyof T) {
    let event: EventOnChange<T>;

    if (action === 'update') {
      // @ts-ignore
      event = { action: 'update', key, value: this.getItem(key) };
    } else {
      event = { action: 'clear' };
    }

    this.eventsManager.emit({ type: 'onChange', event });
  }

  private onNativeStorageChange = (event: StorageEvent) => {
    if (event.storageArea !== this.storage) return;

    if (event.key) {
      this.emitOnChange('update', event.key);
    } else {
      this.emitOnChange('clear');
    }
  }

  private updateNativeStorageListener = () => {
    const hasEvents = !!this.eventsManager.events.onChange?.size;

    if (hasEvents) {
      window.addEventListener('storage', this.onNativeStorageChange);
    } else {
      window.removeEventListener('storage', this.onNativeStorageChange);
    }
  }
}

export type OnStorageChange<T extends Record<string, unknown>> = EventCallbackBase<Events<T>, 'onChange'>

export type StorageType = keyof typeof STORAGES
export type ParseToString<T> = (v: T[keyof T]) => string
export type ParseToJSON<T> = <K extends keyof T>(value: string | null) => T[K] | null

export type StorageBaseConstructorParam<T extends Record<string, unknown>> = {
  type: StorageType,
  parseToString?: ParseToString<T>,
  parseToJSON?: ParseToJSON<T>,
}

export default StorageBase;
