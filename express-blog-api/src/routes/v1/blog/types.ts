import { Types } from "mongoose";

export interface IBlog {
  _id: Types.ObjectId;
  title: string;
  content: string;
  author: Types.ObjectId;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBlogPayload {
  title: string;
  content: string;
  author: Types.ObjectId;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
}

export interface IBlogUpdatePayload {
  title?: string;
  content?: string;
}