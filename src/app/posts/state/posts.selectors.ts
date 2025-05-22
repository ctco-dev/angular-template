import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './posts.reducer';

const selectPostsState = createFeatureSelector<reducer.PostsState>(
  reducer.postsFeature.name,
);

export const selectPosts = createSelector(
  selectPostsState,
  reducer.selectPosts,
);

export const selectPostsLoading = createSelector(
  selectPostsState,
  (state) => state.loading,
);

export const selectPostsErrorMessage = createSelector(
  selectPostsState,
  (state) => state.errorMessage,
);
