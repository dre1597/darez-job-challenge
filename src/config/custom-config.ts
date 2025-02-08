import { registerAs } from '@nestjs/config';

import 'dotenv/config';

export const apiConfig = registerAs('api', () => ({
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
}));

const database = {
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  name: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  migrationsRun: process.env.DATABASE_MIGRATIONS_RUN === 'true',
};
const databaseTest = {
  host: process.env.DATABASE_HOST_TEST || 'localhost',
  port: Number(process.env.DATABASE_PORT_TEST) || 15432,
  user: process.env.DATABASE_USER_TEST || 'postgres',
  password: process.env.DATABASE_PASSWORD_TEST || 'postgres',
  name: process.env.DATABASE_NAME_TEST || 'job_challenge_test_db',
  synchronize: process.env.DATABASE_SYNCHRONIZE_TEST === 'true',
  migrationsRun: process.env.DATABASE_MIGRATIONS_RUN_TEST === 'true',
};

export const databaseConfig = registerAs('database', () =>
  apiConfig().nodeEnv === 'test' ? databaseTest : database,
);
