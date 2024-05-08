import { Router } from 'express';
import { TableController } from '../controllers/table.controller';

export const tableRouter = Router();

tableRouter.get('/:userId', TableController.getTables);
