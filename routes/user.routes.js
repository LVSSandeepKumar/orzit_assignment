import { Router } from "express";
import { createUser, login, updateUser } from "../controllers/user.controller.js";
import { protectRoute } from "../utils/protectRoute.js";

const router = Router();

router.post("/login", login);

router.post("/create", createUser);
router.put("/update", updateUser);

export default router;
