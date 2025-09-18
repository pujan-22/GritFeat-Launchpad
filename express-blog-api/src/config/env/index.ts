import dotenv from "dotenv";
dotenv.config();

const rawPort = process.env.PORT;
const PORT = rawPort && !isNaN(parseInt(rawPort)) ? parseInt(rawPort) : 8080;

const JWT_SECRET = process.env.JWT_SECRET || "";

const rawJwtExpiration = process.env.JWT_EXPIRES_IN;
const JWT_EXPIRATION =
  rawJwtExpiration && !isNaN(parseInt(rawJwtExpiration))
    ? parseInt(rawJwtExpiration)
    : 3600;

// Default to local MongoDB if MONGO_URI is not provided
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/blog-api";

export { PORT, JWT_SECRET, JWT_EXPIRATION, MONGO_URI };