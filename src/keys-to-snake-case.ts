import { mapKeys, camelCase } from 'lodash';

export default <T extends Record<keyof any, any>>(data: Record<keyof any, any>): T => (
  mapKeys(data, (_v, key) => camelCase(key)) as T
);
