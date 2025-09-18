import { Router } from "express";
import { 
  createBlog, 
  getBlogs, 
  getBlog, 
  updateBlog, 
  deleteBlog 
} from "./controller";
import { validate } from "../../../middlewares/validation";
import { authMiddleware } from "../../../middlewares/authentication";
import { authorizationMiddleware } from "../../../middlewares/authorization";
import { createBlogSchema, updateBlogSchema } from "../../../validations/blogValidation";

const router = Router();

router.use(authMiddleware);
router.use(authorizationMiddleware("admin", "blogger"));

router.post("/", validate(createBlogSchema), createBlog);
router.get("/", getBlogs);
router.get("/:blogId", getBlog);
router.patch("/:blogId", validate(updateBlogSchema), updateBlog);
router.delete("/:blogId", deleteBlog);

export default router;