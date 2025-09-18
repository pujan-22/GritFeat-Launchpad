import { Request, Response } from "express";
import { createToken } from "../../../utils/jwt";
import UserRepository from "../user/repository";
import { RegisterInput, LoginInput } from "../../../validations/authValidation";

export const register = async (req: Request<{}, {}, RegisterInput>, res: Response) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    const existingUser = await UserRepository.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const user = await UserRepository.createUser({
      firstName,
      lastName,
      email,
      password,
      role: "blogger"
    });

    const userAny = user as any;

    const token = createToken({
      id: userAny._id.toString(),
      email: user.email,
      role: user.role as "admin" | "blogger"
    });

    res.status(201).json({
      message: "User registered successfully",
      data: {
        user: {
          id: userAny._id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        },
        token
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const login = async (req: Request<{}, {}, LoginInput>, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserRepository.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const userAny = user as any;

    const token = createToken({
      id: userAny._id.toString(),
      email: user.email,
      role: user.role as "admin" | "blogger"
    });

    res.json({
      message: "Login successful",
      data: {
        user: {
          id: userAny._id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        },
        token
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};