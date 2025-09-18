import { Request } from 'express';

export interface CustomRequest extends Request {
  user?: {
    role: "admin" | "blogger";
    userId: string;
  };
}