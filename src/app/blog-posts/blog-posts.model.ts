export interface IBlogPost {

  id: number;
  userId: number;
  title: string;
  body: string;
  comments?: IBlogPostComment[];
}

export interface IBlogPostComment {

  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}
