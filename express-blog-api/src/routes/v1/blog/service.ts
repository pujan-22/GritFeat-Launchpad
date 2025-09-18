import BlogRepository from "./repository";
import { IBlogPayload, IBlogUpdatePayload } from "./types";

const BlogService = {
  async getAll() {
    return await BlogRepository.findAllBlogs();
  },

  async getById(id: string) {
    const blog = await BlogRepository.findBlogById(id);
    if (!blog) throw new Error("Blog not found");
    return blog;
  },

  async create(payload: IBlogPayload & { 
    author: any; 
    createdBy: any; 
    updatedBy: any; 
  }) {
    if (!payload.title?.trim()) throw new Error("Title is required");
    if (!payload.content?.trim()) throw new Error("Content is required");
    if (!payload.author) throw new Error("Author is required");
    
    if (payload.title.length < 3) throw new Error("Title must be at least 3 characters");
    if (payload.content.length < 10) throw new Error("Content must be at least 10 characters");

    return await BlogRepository.createBlog(payload);
  },

  async updateById(id: string, payload: IBlogUpdatePayload, updatedBy: any) {
    const existingBlog = await BlogRepository.findBlogById(id);
    if (!existingBlog) throw new Error("Blog not found");

    if (payload.title !== undefined) {
      if (!payload.title.trim()) throw new Error("Title cannot be empty");
      if (payload.title.length < 3) throw new Error("Title must be at least 3 characters");
    }

    if (payload.content !== undefined) {
      if (!payload.content.trim()) throw new Error("Content cannot be empty");
      if (payload.content.length < 10) throw new Error("Content must be at least 10 characters");
    }

    return await BlogRepository.updateBlogById(id, payload, updatedBy);
  },

  async deleteById(id: string) {
    const deleted = await BlogRepository.deleteBlogById(id);
    if (!deleted) throw new Error("Blog not found");
    return true;
  }
};

export default BlogService;