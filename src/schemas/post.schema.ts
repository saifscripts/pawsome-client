import { PostCategories } from '@/constants/post.constant';
import { z } from 'zod';

export const createPostSchema = z
  .object({
    title: z
      .string({ required_error: 'Title is required' })
      .min(1, { message: 'Title is required' })
      .max(200, { message: 'Title must not exceed 200 characters' }),
    summary: z
      .string({ required_error: 'Summary is required' })
      .min(50, {
        message: 'Post summary must be at least 50 characters long.',
      })
      .max(300, {
        message: 'Post summary cannot exceed 300 characters.',
      }),
    content: z
      .string({ required_error: 'Content is required' })
      .min(1, { message: 'Content is required' }),
    category: z.enum(PostCategories, {
      message: 'Category is required',
    }),
    tags: z
      .string()
      .transform((tags) =>
        tags
          .toLowerCase()
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => Boolean(tag))
      )
      .optional(),
    isPremium: z
      .string()
      .transform((value) => value === 'premium')
      .optional(),
  })
  .transform((data) => {
    const formData = new FormData();
    formData.append('body', JSON.stringify(data));
    return formData;
  });

export const updatePostSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(1, { message: 'Title is required' })
    .max(200, { message: 'Title must not exceed 200 characters' }),
  summary: z
    .string({ required_error: 'Summary is required' })
    .min(50, {
      message: 'Post summary must be at least 50 characters long.',
    })
    .max(300, {
      message: 'Post summary cannot exceed 300 characters.',
    }),
  content: z
    .string({ required_error: 'Content is required' })
    .min(1, { message: 'Content is required' }),
  category: z.enum(PostCategories, {
    message: 'Category is required',
  }),
  tags: z
    .string()
    .transform((tags) =>
      tags
        .toLowerCase()
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => Boolean(tag))
    )
    .optional(),
  isPremium: z
    .string()
    .transform((value) => value === 'premium')
    .optional(),
});
