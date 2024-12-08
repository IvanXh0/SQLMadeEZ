import { DataSource } from 'typeorm';

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_CONNECTION_STRING,
  NODE_ENV,
} = process.env;

const isProduction = NODE_ENV === 'production';

const developmentVariables = {
  host: DB_HOST || 'localhost',
  port: DB_PORT ? Number(DB_PORT) : 5432,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
};

const productionVariables = {
  url: DB_CONNECTION_STRING,
};

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: DB_CONNECTION_STRING,
  ...(isProduction ? productionVariables : developmentVariables),
  // host: DB_HOST || 'localhost',
  // port: DB_PORT ? Number(DB_PORT) : 5432,
  // username: DB_USER,
  // password: DB_PASSWORD,
  // database: DB_NAME,
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.entity.{js,ts}'],
});

export const dynamicDataSource = async (userId: string) => {
  return new DataSource({
    type: 'better-sqlite3',
    database: `./db/${userId}.db`,
    synchronize: true,
    logging: true,
  });
};
