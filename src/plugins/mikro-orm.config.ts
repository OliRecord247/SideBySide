import { defineConfig } from '@mikro-orm/postgresql';

export default defineConfig({
  entitiesTs: ['./src/entities/**/*entity.ts'],
  entities: ['./dist/entities/**/*entity.js'],
  dbName: 'cece',
  user: 'postgres',
  password: 'password',
  host: '127.0.0.1',
  port: 5433,
  debug: true,
  discovery: {
    warnWhenNoEntities: true,
  }
});
