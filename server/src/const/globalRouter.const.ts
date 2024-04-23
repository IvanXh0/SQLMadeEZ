import { Router } from 'express';
import { creatorRouter } from '../routes/creator.route';
import { userRouter } from '../routes/user.routes';

export const globalRouter = Router();

globalRouter.use('/creator', creatorRouter);
globalRouter.use('/user', userRouter);
