import Blog, { IBlog } from "../../../models/Blog";
import { Types } from "mongoose";

export const createBlog = async (blogData: {
  title: string;
  content: string;
  author: Types.ObjectId;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
}): Promise<IBlog> => {
  const blog = await Blog.create(blogData);
  return blog;
};

export const findBlogById = async (id: string): Promise<IBlog | null> => {
  return await Blog.findById(id)
    .populate("author", "firstName lastName email")
    .populate("createdBy", "firstName lastName")
    .populate("updatedBy", "firstName lastName");
};

export const findAllBlogs = async (): Promise<IBlog[]> => {
  return await Blog.find()
    .populate("author", "firstName lastName email")
    .populate("createdBy", "firstName lastName")
    .populate("updatedBy", "firstName lastName")
    .sort({ createdAt: -1 });
};

export const findBlogsByAuthor = async (authorId: string): Promise<IBlog[]> => {
  return await Blog.find({ author: new Types.ObjectId(authorId) })
    .populate("author", "firstName lastName email")
    .populate("createdBy", "firstName lastName")
    .populate("updatedBy", "firstName lastName")
    .sort({ createdAt: -1 });
};

export const updateBlogById = async (
  id: string, 
  updateData: Partial<{ title: string; content: string }>, 
  updatedBy: Types.ObjectId
): Promise<IBlog | null> => {
  return await Blog.findByIdAndUpdate(
    id,
    { ...updateData, updatedBy },
    { new: true, runValidators: true }
  )
  .populate("author", "firstName lastName email")
  .populate("createdBy", "firstName lastName")
  .populate("updatedBy", "firstName lastName");
};

export const deleteBlogById = async (id: string): Promise<IBlog | null> => {
  return await Blog.findByIdAndDelete(id);
};

export const findBlogByIdAndAuthor = async (id: string, authorId: string): Promise<IBlog | null> => {
  return await Blog.findOne({ _id: new Types.ObjectId(id), author: new Types.ObjectId(authorId) })
    .populate("author", "firstName lastName email")
    .populate("createdBy", "firstName lastName")
    .populate("updatedBy", "firstName lastName");
};

export default {
  createBlog,
  findBlogById,
  findAllBlogs,
  findBlogsByAuthor,
  updateBlogById,
  deleteBlogById,
  findBlogByIdAndAuthor
};