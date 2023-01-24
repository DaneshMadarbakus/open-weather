import { Router } from "express";
import {
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller";

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.delete("/logout", logoutUser);

export default router;
