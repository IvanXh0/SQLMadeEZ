import { Request, Response } from "express";
import { CreatorService } from "../services/creator.service";

export class CreatorController {
  static async getAll(_, res: Response) {
    try {
      const creators = await CreatorService.getAll();

      res.status(200).send(creators);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async executeQuery(req: Request, res: Response) {
    try {
      const result = await CreatorService.executeQuery(req.body);

      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
