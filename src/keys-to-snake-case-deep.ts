import { isString, snakeCase } from 'lodash';
import mapDeep from './map-deep';

const keysToSnakeCaseDeep = <T extends Record<keyof any, any>>(data: Record<keyof any, any>) => (
  mapDeep<T>(data, (_value, key) => ({ key: (isString(key) ? snakeCase(key) : key) }))
);

export default keysToSnakeCaseDeep;
