import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateDto } from '../middlewares/dto-validator.middleware';
import { CreateUserDto } from '../dtos/create-user.dto';

export const userRouter = Router();

userRouter.get('/', UserController.getAll);

userRouter.get('/:email', UserController.getAllQueriesByUser);

userRouter.post('/', validateDto(CreateUserDto), UserController.saveUser);

userRouter.delete('/:userId', UserController.deleteUser);
