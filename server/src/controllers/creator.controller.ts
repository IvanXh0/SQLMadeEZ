import { Request, Response } from 'express';
import { CreatorService } from '../services/creator.service';

export class CreatorController {
  static async getAll(_, res: Response) {
    try {
      const creators = await CreatorService.getAll();

      res.status(200).send(creators);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }

  static async executeQuery(req: Request, res: Response) {
    const shouldSave = req.query.shouldSaveQuery !== undefined;
    try {
      const result = await CreatorService.executeQuery(req.body, shouldSave);

      res.status(200).json({ msg: 'Query executed successfully', result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllQueriesByUser(req: Request, res: Response) {
    const { userId } = req.params;
    try {
      const queriesByUser = await CreatorService.getAllQueriesByUser(userId);

      if (!queriesByUser.length) throw new Error('No queries found');

      res.status(200).send(queriesByUser);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
}
