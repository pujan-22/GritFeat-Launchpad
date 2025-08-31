import { IBlog, IBlogPayload, IBlogUpdatePayload } from "./types";

let BLOGS: IBlog[] = [];
let nextId = 1;

const BlogRepository = {
  getNextId(): number {
    return nextId++;
  },

  create(payload: IBlogPayload): IBlog {
    const blog: IBlog = {
      id: this.getNextId(),
      title: payload.title,
      content: payload.content,
      author: payload.author,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    BLOGS.push(blog);
    return blog;
  },

  getAll(): IBlog[] {
    return BLOGS;
  },

  getById(id: number): IBlog | undefined {
    return BLOGS.find(blog => blog.id === id);
  },

  updateById(id: number, payload: IBlogUpdatePayload): IBlog | undefined {
    const blogIndex = BLOGS.findIndex(blog => blog.id === id);
    if (blogIndex === -1) return undefined;

    const updatedBlog: IBlog = {
      ...BLOGS[blogIndex],
      ...payload,
      updatedAt: new Date()
    };

    BLOGS[blogIndex] = updatedBlog;
    return updatedBlog;
  },

  deleteById(id: number): boolean {
    const initialLength = BLOGS.length;
    BLOGS = BLOGS.filter(blog => blog.id !== id);
    return BLOGS.length < initialLength;
  }
};

export default BlogRepository;