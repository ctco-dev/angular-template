import { createReducer, on } from '@ngrx/store';
import * as PostsActions from './posts.actions';
import { Post, Comment } from '../models/comment.model';

export interface PostsState {
  posts: Post[];
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

export const initialState: PostsState = {
  posts: [],
  comments: [],
  loading: false,
  error: null,
};

export const postsReducer = createReducer(
  initialState,
  on(PostsActions.loadPosts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PostsActions.loadPostsSuccess, (state, { posts }) => ({
    ...state,
    posts,
    loading: false,
  })),
  on(PostsActions.loadPostsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(PostsActions.loadComments, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PostsActions.loadCommentsSuccess, (state, { comments }) => ({
    ...state,
    comments,
    loading: false,
  })),
  on(PostsActions.loadCommentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);