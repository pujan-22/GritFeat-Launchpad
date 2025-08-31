import BlogRepository from "./repository";
import { IBlogPayload, IBlogUpdatePayload } from "./types";

const BlogService = {
  getAll() {
    return BlogRepository.getAll();
  },

  getById(id: number) {
    const blog = BlogRepository.getById(id);
    if (!blog) throw new Error("Blog not found");
    return blog;
  },

  create(payload: IBlogPayload) {
    if (!payload.title?.trim()) throw new Error("Title is required");
    if (!payload.content?.trim()) throw new Error("Content is required");
    if (!payload.author?.trim()) throw new Error("Author is required");
    
    if (payload.title.length < 3) throw new Error("Title must be at least 3 characters");
    if (payload.content.length < 10) throw new Error("Content must be at least 10 characters");
    if (payload.author.length < 2) throw new Error("Author must be at least 2 characters");

    return BlogRepository.create(payload);
  },

  updateById(id: number, payload: IBlogUpdatePayload) {
    const existingBlog = BlogRepository.getById(id);
    if (!existingBlog) throw new Error("Blog not found");

    if (payload.title !== undefined) {
      if (!payload.title.trim()) throw new Error("Title cannot be empty");
      if (payload.title.length < 3) throw new Error("Title must be at least 3 characters");
    }

    if (payload.content !== undefined) {
      if (!payload.content.trim()) throw new Error("Content cannot be empty");
      if (payload.content.length < 10) throw new Error("Content must be at least 10 characters");
    }

    if (payload.author !== undefined) {
      if (!payload.author.trim()) throw new Error("Author cannot be empty");
      if (payload.author.length < 2) throw new Error("Author must be at least 2 characters");
    }

    return BlogRepository.updateById(id, payload);
  },

  deleteById(id: number) {
    const deleted = BlogRepository.deleteById(id);
    if (!deleted) throw new Error("Blog not found");
    return true;
  }
};

export default BlogService;