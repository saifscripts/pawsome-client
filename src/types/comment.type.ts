import { IUser } from './user.type';

export interface IComment {
  _id?: string;
  postId: string;
  author: Pick<IUser, '_id' | 'name' | 'email' | 'avatarURL'>;
  content: string;
  isDeleted?: boolean;
}
