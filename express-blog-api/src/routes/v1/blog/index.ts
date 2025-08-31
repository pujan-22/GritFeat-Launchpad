import { Router } from "express";
import { BlogController } from "./controller";

const router = Router();

router.get("/", BlogController.getAll);
router.get("/:id", BlogController.getById);
router.post("/", BlogController.create);
router.put("/:id", BlogController.update);
router.delete("/:id", BlogController.delete);

export default router;