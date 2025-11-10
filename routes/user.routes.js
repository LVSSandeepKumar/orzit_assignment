import { Router } from "express";
import { createUser, login, updateUser } from "../controllers/user.controller.js";
import { protectRoute } from "../utils/protectRoute.js";
import { verifyAdmin } from "../utils/verifyAdmin.js";

const router = Router();

router.post("/login", login);

router.post("/create", protectRoute, verifyAdmin, createUser);
router.put("/update", updateUser);

export default router;
