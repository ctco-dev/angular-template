import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getRouterSelectors } from '@ngrx/router-store';
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

export const { selectRouteParams } = getRouterSelectors();

export const selectPostById = createSelector(
  selectPostsEntities,
  selectRouteParams,
  (productEntities, { id }) => productEntities[id]
);

export const selectPostId = createSelector(
  selectRouteParams,
  ({ id }) => id ? Number(id) : -1
);
