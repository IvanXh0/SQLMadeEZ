import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import { globalRouter } from './const/globalRouter.const';
import { AppDataSource } from './const/dataSource';

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || 'localhost';

app.use(express.json());

app.use('/api', globalRouter);

app.listen(PORT, HOST, () => {
  console.log('Server started on port 3000');
});

AppDataSource.initialize()
  .then(() => {
    console.log(`Server started on http://${HOST}:${PORT}`);
    console.log('DATABASE INITIALIZED');
  })
  .catch(err => console.log(err));
