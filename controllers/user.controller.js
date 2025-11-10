import bcrypt from "bcryptjs";
import fs from "fs";

import prisma from "../db/prismaClient.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export async function createUser(req, res, next) {
  try {
    const data = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    data.password = hashedPassword;

    const user = await prisma.user.create({
      data,
    });

    user.password = undefined;

    res.status(201).json({
      data: user,
      message: "User Created",
    });
  } catch (error) {
    console.error("Error in creating user", error);
    res.json(500).json({
      message: error.message,
    });
  }
}

// Login API

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    console.log("User is", user);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    generateTokenAndSetCookie(user.id, res);

    res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error in creating user", error);
    res.json(500).json({
      message: error.message,
    });
  }
}

export async function logout(req, res, next) {
  try {
    res.clearCookie("jwt");
    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Error in creating user", error);
    res.json(500).json({
      message: error.message,
    });
  }
}

export async function updateUser(req, res, next) {
  try {
    const imageUrl = req.file.path;

    let { id } = req.params;
    id = parseInt(id);

    const existingUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Delete existing image from uploads folder
    if (existingUser.imageUrl) {
      const imagePath = existingUser.imageUrl;
      const imageName = imagePath.split("/").pop();
      const imageFullPath = `${process.cwd()}/${imageName}`;
      if (fs.existsSync(imageFullPath)) {
        try {
          fs.unlinkSync(imageFullPath); // Synchronous deletion
          console.log("File deleted successfully.");
        } catch (err) {
          console.error("Error deleting file:", err);
          // Optionally handle the error further or throw it
        }
      }
    }

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        imageUrl,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(201).json({
      data: user,
      message: "User Updated",
    });
  } catch (error) {
    console.error("Error in creating user", error);
    res.json(500).json({
      message: error.message,
    });
  }
}
