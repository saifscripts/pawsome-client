export interface IComment {
  _id?: string;
  postId: string;
  author: string;
  content: string;
  isDeleted?: boolean;
}
