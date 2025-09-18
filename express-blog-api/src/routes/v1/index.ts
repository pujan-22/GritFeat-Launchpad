import { Router } from "express";
import authRouter from "./auth";
import blogRouter from "./blog";

const router = Router();

router.use("/auth", authRouter);
router.use("/blogs", blogRouter);

export default router;