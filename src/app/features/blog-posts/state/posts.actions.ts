import { createAction, props } from '@ngrx/store';
import { Post, Comment } from '../models/comment.model';

// Load Posts
export const loadPosts = createAction('[Posts] Load Posts');
export const loadPostsSuccess = createAction(
  '[Posts] Load Posts Success',
  props<{ posts: Post[] }>()
);
export const loadPostsFailure = createAction(
  '[Posts] Load Posts Failure',
  props<{ error: string }>()
);

// Load Comments
export const loadComments = createAction(
  '[Posts] Load Comments',
  props<{ postId: number }>()
);
export const loadCommentsSuccess = createAction(
  '[Posts] Load Comments Success',
  props<{ comments: Comment[] }>()
);
export const loadCommentsFailure = createAction(
  '[Posts] Load Comments Failure',
  props<{ error: string }>()
);