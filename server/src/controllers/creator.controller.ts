import { Request, Response } from "express";

export class CreatorController {
  static async getAll(req: Request, res: Response) {
    try {
      res.send("Get all");
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
