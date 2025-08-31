import express, { Request, Response } from "express";
import { PORT } from "./config/env";
import router from "./routes";

const app = express();

app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "Blog API is healthy" });
});

app.use("/api", router);

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Blog API running on port ${PORT}`);
});