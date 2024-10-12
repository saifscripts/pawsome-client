import { PostCategories } from '@/constants';

export type IPostCategory = (typeof PostCategories)[number];

export interface IPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  category: IPostCategory;
  imageUrls?: string[];
  upvotes: [string];
  downvotes: [string];
  comments: [string];
  isPremium: boolean;
  isPublished: boolean;
  isDeleted: boolean;
}
