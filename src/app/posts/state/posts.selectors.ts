import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouteParam } from 'src/app/router.selectors';
import * as reducer from './posts.reducer';

const selectPostsState = createFeatureSelector<reducer.PostsState>(
  reducer.postsFeature.name,
);

export const selectPosts = createSelector(
  selectPostsState,
  reducer.selectPosts,
);

export const selectPostsEntities = createSelector(
  selectPostsState,
  reducer.selectPostsEntities,
);

export const selectPostById = createSelector(
  selectPostsEntities,
  selectRouteParam('id'),
  (entities, id) => (id ? entities[id] : undefined),
);

export const selectPostsLoading = createSelector(
  selectPostsState,
  (state) => state.loading,
);

export const selectPostsLoaded = createSelector(
  selectPostsState,
  (state) => state.loaded,
);

export const selectPostsErrorMessage = createSelector(
  selectPostsState,
  (state) => state.errorMessage,
);
