import { PostCategories } from '@/constants';
import { IComment } from './comment.type';
import { IUser } from './user.type';

export type IPostCategory = (typeof PostCategories)[number];

export interface IPost {
  _id: string;
  title: string;
  summary: string;
  content?: string;
  author: IUser;
  category: IPostCategory;
  tags: string[];
  featuredImage: string;
  upvotes: string[];
  downvotes: string[];
  comments: IComment[];
  isPremium: boolean;
  isPublished: boolean;
  createdAt: Date;
  isDeleted: boolean;
}
