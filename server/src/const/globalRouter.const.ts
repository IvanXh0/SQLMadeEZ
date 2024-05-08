import { Router } from 'express';
import { creatorRouter } from '../routes/creator.route';
import { userRouter } from '../routes/user.routes';
import { tableRouter } from '../routes/table.route';

export const globalRouter = Router();

globalRouter.use('/creator', creatorRouter);
globalRouter.use('/user', userRouter);
globalRouter.use('/table', tableRouter);
