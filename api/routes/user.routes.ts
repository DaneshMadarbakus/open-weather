import { Router } from "express";
import { userControllers } from "../controllers";

const router = Router();

router.get("/users", userControllers.getUsers);

export default router;
