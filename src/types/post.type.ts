import { PostCategories } from '@/constants';
import { IComment } from './comment.type';

export type IPostCategory = (typeof PostCategories)[number];

export interface IPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  category: IPostCategory;
  featuredImage: string;
  upvotes: [string];
  downvotes: [string];
  comments: IComment[];
  isPremium: boolean;
  isPublished: boolean;
  createdAt: Date;
  isDeleted: boolean;
}
