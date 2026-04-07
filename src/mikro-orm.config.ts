import { defineConfig } from '@mikro-orm/postgresql';
import { UserSchema } from './entities/user.entity.js';

export default defineConfig({
  entities: [UserSchema],
  dbName: 'cece',
  user: 'postgres',
  password: 'password',
  host: '127.0.0.1',
  port: 5433,
  debug: true,
});
