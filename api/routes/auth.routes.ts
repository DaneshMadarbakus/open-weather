import express, { Request, Response } from "express";
import { createUser, loginUser } from "../controllers/auth.controller";

const router = express.Router();

router.delete("/logout", (req: Request, res: Response) => {
  // refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

router.post("/register", createUser);
router.post("/login", loginUser);

export default router;
