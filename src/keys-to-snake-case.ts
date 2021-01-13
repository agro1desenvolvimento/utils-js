import { isString, snakeCase } from 'lodash';
import mapDeep from './map-deep';

const keysToSnakeCase = <T extends Record<keyof any, any>>(data: Record<keyof any, any>): T => (
  mapDeep<T>(data, (_value, key) => ({ key: (isString(key) ? snakeCase(key) : key) }), 0)
);

export default keysToSnakeCase;
