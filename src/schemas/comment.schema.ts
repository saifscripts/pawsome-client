import { z } from 'zod';

export const createCommentSchema = z.object({
  postId: z.string({
    required_error: 'Post ID is required',
  }),
  content: z
    .string({
      required_error: 'Content is required',
    })
    .min(1, 'Content cannot be empty')
    .max(200, 'Content must not exceed 200 characters'),
});
