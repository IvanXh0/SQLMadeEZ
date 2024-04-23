import { Router } from 'express';
import { creatorRouter } from '../routes/creator.route';

export const globalRouter = Router();

globalRouter.use('/creator', creatorRouter);
