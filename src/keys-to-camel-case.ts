import { mapKeys, camelCase } from 'lodash';

const keysToCamelCase = <T extends Record<keyof any, any>>(data: Record<keyof any, any>): T => (
  mapKeys(data, (_v, key) => camelCase(key)) as T
);

export default keysToCamelCase;
