import { Router } from "express";
import { authControllers } from "../controllers";

const router = Router();

router.post("/register", authControllers.createUser);
router.post("/login", authControllers.loginUser);
router.post("/refresh-token", authControllers.refreshToken);
router.delete("/logout", authControllers.logoutUser);

export default router;
