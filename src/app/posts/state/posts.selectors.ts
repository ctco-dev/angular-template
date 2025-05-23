import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducerPosts from './posts.reducer';

export const selectPostsState =
  createFeatureSelector<reducerPosts.PostsState>('posts');

export const selectPosts = createSelector(
  selectPostsState,
  reducerPosts.selectPosts,
);

export const selectPostsEntities = createSelector(
  selectPostsState,
  reducerPosts.selectPostsEntities,
);

export const selectPostsLoading = createSelector(
  selectPostsState,
  (state) => state.loading,
);

export const selectPostErrorMessage = createSelector(
  selectPostsState,
  (state) => state.errorMessage,
);
