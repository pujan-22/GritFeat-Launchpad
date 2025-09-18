import { Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import UserRepository from "../routes/v1/user/repository";
import { CustomRequest } from "../types/customRequest";

export const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }

  const user = await UserRepository.findUserById(payload.id);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const userAny = user as any;
  
  req.user = {
    role: user.role as "admin" | "blogger",
    userId: userAny._id ? userAny._id.toString() : userAny.id,
  };

  next();
};