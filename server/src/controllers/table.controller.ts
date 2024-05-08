import { Request, Response } from 'express';
import { TableService } from '../services/table.service';

export class TableController {
  static async getTables(req: Request, res: Response) {
    const { userId } = req.params;

    if (!userId) throw new Error('User ID is required');

    try {
      const tables = await TableService.getTables(userId);
      res.status(200).send(tables);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
}
