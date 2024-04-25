import { DataSource } from 'typeorm';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST || 'localhost',
  port: DB_PORT ? Number(DB_PORT) : 5432,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
});

export const dynamicDataSource = async (userId: string) => {
  return new DataSource({
    type: 'better-sqlite3',
    database: `./db/${userId}.db`,
    synchronize: true,
    logging: true,
  });
};
