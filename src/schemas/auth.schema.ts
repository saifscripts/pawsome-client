import validator from 'validator';
import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(1, 'Name is required')
    .min(3, 'Name must be at least 3 characters long'),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters long'),
  phone: z
    .string({ required_error: 'Phone number is required' })
    .min(1, 'Phone number is required')
    .refine((value) => validator.isMobilePhone(value), {
      message: 'Invalid phone number',
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(1, 'Password is required'),
});
