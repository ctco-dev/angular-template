export interface IBlogPost {

  id: number;
  userId: number;
  title: string;
}

export interface IBlogPostComment {

  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}
