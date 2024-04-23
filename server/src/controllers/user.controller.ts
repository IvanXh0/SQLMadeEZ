import { UserService } from '../services/user.service';
import { Response, Request } from 'express';

export class UserController {
  static async getAll(_, res: Response) {
    try {
      const users = await UserService.getAll();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async getAllQueriesByUser(req: Request, res: Response) {
    const { email } = req.params;
    try {
      const users = await UserService.getAllQueriesByUser(email);
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async saveUser(req: Request, res: Response) {
    try {
      const user = await UserService.saveUser(req.body);
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
