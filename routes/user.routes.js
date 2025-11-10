import { Router } from "express";
import multer from "multer";

import { createUser, login, logout, updateUser } from "../controllers/user.controller.js";
import { protectRoute } from "../utils/protectRoute.js";
import { verifyAdmin } from "../utils/verifyAdmin.js";

const router = Router();

// Configure multer to use original file name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    cb(null, originalName); // Use the original file name
  },
});

const upload = multer({ storage: storage });

router.post("/login", login);
router.post("/logout", logout);

router.post("/create", protectRoute, verifyAdmin, createUser);
router.put("/update/:id", upload.single("file"), protectRoute, updateUser);

export default router;
