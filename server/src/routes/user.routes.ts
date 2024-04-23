import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

export const userRouter = Router();

userRouter.get('/', UserController.getAll);

userRouter.get('/:email/', UserController.getAllQueriesByUser);

userRouter.post('/', UserController.saveUser);
