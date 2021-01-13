import { isArray, isPlainObject, reduce } from 'lodash';

const isIterable = (value: any) => Array.isArray(value) || isPlainObject(value);

const mapDeep = <T extends Record<string | number, any>>(
  object: Record<string | number, any>,
  callback: MapDeepCallbackType,
  deep = Infinity,
): T => reduce<typeof object, Record<string | number, any>>(
  object,
  (acc, currentValue, currentKey) => {
    const { value = currentValue, key = currentKey } = callback(currentValue, currentKey) || {};

    acc[key] = deep > 0 && isIterable(value) ? mapDeep(value, callback, deep - 1) : value;
    return acc;
  },
  (isArray(object) ? [] : {}),
) as T;

export default mapDeep;

type MapDeepCallbackType = (value: any, key: string | number) => (
  { key: string | number, value?: any } | void
)
