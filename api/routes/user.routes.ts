import { Router } from "express";
import { userControllers } from "../controllers";
import { authenticateToken } from "../middleware/checkAuth.middleware";

const router = Router();

router.get("/users", authenticateToken, userControllers.getUsers);

export default router;
