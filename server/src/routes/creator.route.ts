import { Router } from 'express';
import { CreatorController } from '../controllers/creator.controller';
import { CreateCreatorDto } from '../dtos/create-creator.dto';
import { validateDto } from '../middlewares/dto-validator.middleware';
import { sqlFilterMiddleware } from '../middlewares/sql-filter.middleware';

export const creatorRouter = Router();

creatorRouter.get('/', CreatorController.getAll);
creatorRouter.get('/:userId', CreatorController.getAllQueriesByUser);
creatorRouter.post(
  '/execute-query',
  validateDto(CreateCreatorDto),
  sqlFilterMiddleware,
  CreatorController.executeQuery,
);
