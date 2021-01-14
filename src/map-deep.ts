import { isArray, isPlainObject, reduce } from 'lodash';

const isIterable = (value: any) => Array.isArray(value) || isPlainObject(value);

const mapDeep = <T extends Record<keyof any, any>>(
  object: Record<keyof any, any>,
  callback: MapDeepCallbackType,
  deep = Infinity,
): T => reduce<typeof object, Record<keyof any, any>>(
  object,
  (acc, currentValue, currentKey) => {
    const {
      value = currentValue,
      key = currentKey,
    } = callback(currentValue, currentKey, acc) || {};

    // https://github.com/microsoft/TypeScript/issues/1863
    // @ts-expect-error
    acc[key] = deep > 0 && isIterable(value)
      ? mapDeep(value, callback, deep - 1)
      : value;
    return acc;
  },
  isArray(object) ? [] : {},
) as T;

export default mapDeep;

type MapDeepCallbackType = (
  value: any,
  key: keyof any,
  target: Record<keyof any, any>,
) => { key?: keyof any; value?: any } | void;
