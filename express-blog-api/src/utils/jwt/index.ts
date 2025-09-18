import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { TokenPayload } from "./types";
import { JWT_EXPIRATION, JWT_SECRET } from "../../config/env";

export const createToken = (payload: TokenPayload): string => {
    const options: SignOptions = { expiresIn: JWT_EXPIRATION };
    return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): TokenPayload | null => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        return {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
        };
    } catch (err) {
        return null;
    }
};