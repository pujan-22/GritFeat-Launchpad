import { Response } from "express";
import BlogService from "./service";
import { CreateBlogInput, UpdateBlogInput } from "../../../validations/blogValidation";
import { Types } from "mongoose";
import { CustomRequest } from "../../../types/customRequest";

export const createBlog = async (req: CustomRequest, res: Response) => {
  try {
    const { title, content } = req.body as CreateBlogInput;
    
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const userId = new Types.ObjectId(req.user.userId);

    const blog = await BlogService.create({
      title,
      content,
      author: userId,
      createdBy: userId,
      updatedBy: userId
    });

    res.status(201).json({
      message: "Blog created successfully",
      data: blog
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getBlogs = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const userId = req.user.userId;
    const userRole = req.user.role;

    let blogs;
    if (userRole === "admin") {
      blogs = await BlogService.getAll();
    } else {
      const BlogRepository = await import("./repository");
      blogs = await BlogRepository.findBlogsByAuthor(userId);
    }

    res.json({
      message: "Blogs retrieved successfully",
      data: blogs
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getBlog = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const { blogId } = req.params;
    const userId = req.user.userId;
    const userRole = req.user.role;

    let blog;
    if (userRole === "admin") {
      blog = await BlogService.getById(blogId);
    } else {
      const BlogRepository = await import("./repository");
      blog = await BlogRepository.findBlogByIdAndAuthor(blogId, userId);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
    }

    res.json({
      message: "Blog retrieved successfully",
      data: blog
    });
  } catch (error: any) {
    if (error.message === "Blog not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateBlog = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const { blogId } = req.params;
    const { title, content } = req.body as UpdateBlogInput;
    const userId = new Types.ObjectId(req.user.userId);
    const userRole = req.user.role;

    let blog;
    if (userRole === "admin") {
      blog = await BlogService.updateById(blogId, { title, content }, userId);
    } else {
      const BlogRepository = await import("./repository");
      const existingBlog = await BlogRepository.findBlogByIdAndAuthor(blogId, req.user.userId);
      if (!existingBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      blog = await BlogService.updateById(blogId, { title, content }, userId);
    }

    res.json({
      message: "Blog updated successfully",
      data: blog
    });
  } catch (error: any) {
    if (error.message === "Blog not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteBlog = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const { blogId } = req.params;
    const userRole = req.user.role;

    if (userRole === "admin") {
      await BlogService.deleteById(blogId);
    } else {
      const BlogRepository = await import("./repository");
      const existingBlog = await BlogRepository.findBlogByIdAndAuthor(blogId, req.user.userId);
      if (!existingBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      await BlogService.deleteById(blogId);
    }

    res.json({
      message: "Blog deleted successfully"
    });
  } catch (error: any) {
    if (error.message === "Blog not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};