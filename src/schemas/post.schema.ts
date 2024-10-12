import { PostCategories } from '@/constants/post.constant';
import { z } from 'zod';

export const createPostSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(1, { message: 'Title is required' })
    .max(200, { message: 'Title must not exceed 200 characters' }),
  content: z
    .string({ required_error: 'Content is required' })
    .min(1, { message: 'Content is required' }),
  category: z.enum(PostCategories, {
    message: 'Category is required',
  }),
  // imageUrls: z.array(z.string().url('Invalid image url')).optional(),
  isPremium: z
    .string()
    .transform((value) => value === 'premium')
    .optional(),
});
