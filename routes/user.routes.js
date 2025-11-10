import { Router } from "express";
import { createUser, updateUser } from "../controllers/user.controller.js";

const router = Router(); 

router.post("/create", createUser); 
router.put("/update", updateUser);

export default router; 