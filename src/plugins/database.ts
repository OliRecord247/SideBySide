import { MikroORM, SchemaGenerator } from '@mikro-orm/postgresql';
import config from './mikro-orm.config.js';

export async function initDatabase() {
  const orm = await MikroORM.init(config);

  const generator = new SchemaGenerator(orm.em);
  await generator.update({ safe: true });

  return orm;
}
