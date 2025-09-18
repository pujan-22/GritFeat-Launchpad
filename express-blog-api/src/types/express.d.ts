import { Request } from 'express';

declare module 'express' {
  export interface Request {
    user?: {
      role: "admin" | "blogger";
      userId: string;
    };
  }
}