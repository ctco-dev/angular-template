import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.reducer';

export const selectPostsState = createFeatureSelector<PostsState>('posts');

export const selectAllPosts = createSelector(
  selectPostsState,
  (state) => state.posts
);

export const selectPostById = (id: number) =>
  createSelector(selectAllPosts, (posts) =>
    posts.find((post) => post.id === id)
  );

export const selectComments = createSelector(
  selectPostsState,
  (state) => state.comments
);

export const selectLoading = createSelector(
  selectPostsState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectPostsState,
  (state) => state.error
);