import { createFeatureSelector, createSelector } from "@ngrx/store";
import { getRouterSelectors } from "@ngrx/router-store";
import * as fromPosts from './posts.reducer';

export const selectPostsState = createFeatureSelector<fromPosts.PostsState>('posts');

export const selectPostsLoading = createSelector(
    selectPostsState,
    ({ loading }) => loading
);

export const selectPostsErrorMessage = createSelector(
    selectPostsState,
    ({ errorMessage }) => errorMessage
);

export const selectPosts = createSelector(
    selectPostsState,
    fromPosts.selectAllPosts
);

export const selectPostsEntitites = createSelector(
    selectPostsState,
    fromPosts.selectPostEntities
);

export const { selectRouteParams } = getRouterSelectors();

export const selectPostById = createSelector(
    selectPostsEntitites,
    selectRouteParams,
    ((entities, { id }) => entities[id])
);
