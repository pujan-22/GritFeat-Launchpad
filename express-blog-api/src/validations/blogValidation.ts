import { z } from "zod";

export const createBlogSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(200),
    content: z.string().min(10, "Content must be at least 10 characters").max(5000)
  })
});

export const updateBlogSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(200).optional(),
    content: z.string().min(10, "Content must be at least 10 characters").max(5000).optional()
  })
});

export type CreateBlogInput = z.infer<typeof createBlogSchema>["body"];
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>["body"];