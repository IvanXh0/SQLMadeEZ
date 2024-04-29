import { UserService } from '../services/user.service';
import { Response, Request } from 'express';

export class UserController {
  static async getAll(_, res: Response) {
    try {
      const users = await UserService.getAll();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }

  static async getAllQueriesByUser(req: Request, res: Response) {
    const { email } = req.params;
    try {
      const queriesByUser = await UserService.getAllQueriesByUser(email);

      if (!queriesByUser.length) throw new Error('No queries found');

      res.status(200).send(queriesByUser);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }

  static async saveUser(req: Request, res: Response) {
    try {
      const user = await UserService.saveUser(req.body);
      res.status(200).send(user);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      console.log(req.params);
      const { userId } = req.params;

      await UserService.deleteUser(userId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
}
