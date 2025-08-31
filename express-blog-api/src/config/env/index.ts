import dotenv from "dotenv";
dotenv.config();

const rawPort = process.env.PORT;
const PORT = rawPort && !isNaN(parseInt(rawPort)) ? parseInt(rawPort) : 3000;

export { PORT };