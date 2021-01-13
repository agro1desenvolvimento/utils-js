import { camelCase, isString } from 'lodash';
import mapDeep from './map-deep';

const keysToCamelCaseDeep = <T extends Record<keyof any, any>>(data: Record<keyof any, any>) => (
  mapDeep<T>(data, (_value, key) => ({ key: (isString(key) ? camelCase(key) : key) }))
);

export default keysToCamelCaseDeep;
