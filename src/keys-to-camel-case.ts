import { camelCase, isString } from 'lodash';
import mapDeep from './map-deep';

const keysToCamelCase = <T extends Record<keyof any, any>>(data: Record<keyof any, any>): T => (
  mapDeep<T>(data, (_value, key) => ({ key: (isString(key) ? camelCase(key) : key) }), 0)
);

export default keysToCamelCase;
