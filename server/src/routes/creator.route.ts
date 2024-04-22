import { Router } from "express";
import { CreatorController } from "../controllers/creator.controller";

export const creatorRouter = Router();

creatorRouter.get("/", CreatorController.getAll);
