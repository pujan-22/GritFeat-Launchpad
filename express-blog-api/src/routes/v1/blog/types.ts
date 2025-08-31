export interface IBlog {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBlogPayload {
  title: string;
  content: string;
  author: string;
}

export interface IBlogUpdatePayload {
  title?: string;
  content?: string;
  author?: string;
}