import prisma from "../db/prismaClient.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(400).json({ error: "Unauthorized: No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(400).json({ error: "Unauthorized: Invalid token provided" });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });
    user.password = undefined;
    if (!user) {
      return res.staus(404).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(`Error in protectRoute Middleware, ${error.message}`);
    return res.status(500).json({
      error: "Internal Server Error.",
    });
  }
};
