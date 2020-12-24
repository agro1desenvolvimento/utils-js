import { mapKeys, snakeCase } from 'lodash';

const keysToSnakeCase = <T extends Record<keyof any, any>>(data: Record<keyof any, any>): T => (
  mapKeys(data, (_v, key) => snakeCase(key)) as T
)

export default keysToSnakeCase;
