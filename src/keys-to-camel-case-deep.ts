import { camelCase } from 'lodash';

const keysToCamelCaseDeep = <T extends Record<keyof any, any>>(data: Record<keyof any, any>) => (
  Object.entries(data).reduce<Record<keyof any, any>>((acc, [key, value]) => {
    acc[camelCase(key)] = typeof value === 'object' && value !== null ? keysToCamelCaseDeep(value) : value;
    return acc;
  }, Array.isArray(data) ? [] : {}) as T
);

export default keysToCamelCaseDeep;
