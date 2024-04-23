import { Router } from 'express';
import { CreatorController } from '../controllers/creator.controller';
import { CreateCreatorDto } from '../dtos/creator.dto';
import { dtoValidationMiddleware } from '../middlewares/dto-validator.middleware';

export const creatorRouter = Router();

creatorRouter.get('/', CreatorController.getAll);
creatorRouter.post(
  '/execute-query',
  dtoValidationMiddleware(CreateCreatorDto),
  CreatorController.executeQuery,
);
