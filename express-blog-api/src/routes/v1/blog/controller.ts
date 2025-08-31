import { Request, Response } from "express";
import BlogService from "./service";
import { IBlogPayload } from "./types";

export const BlogController = {
  getAll(req: Request, res: Response) {
    try {
      const blogs = BlogService.getAll();
      res.json({ 
        message: "Blogs retrieved successfully", 
        count: blogs.length,
        data: blogs 
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid blog ID" });
      }

      const blog = BlogService.getById(id);
      res.json({ message: "Blog retrieved successfully", data: blog });
    } catch (error: any) {
      if (error.message === "Blog not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },

  create(req: Request, res: Response) {
    try {
      const { title, content, author } = req.body;
      const blog = BlogService.create({ title, content, author });
      
      res.status(201).json({ 
        message: "Blog created successfully", 
        data: blog 
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid blog ID" });
      }

      const blog = BlogService.updateById(id, req.body);
      res.json({ message: "Blog updated successfully", data: blog });
    } catch (error: any) {
      if (error.message === "Blog not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  },

  delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid blog ID" });
      }

      BlogService.deleteById(id);
      res.json({ message: "Blog deleted successfully" });
    } catch (error: any) {
      if (error.message === "Blog not found") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
};