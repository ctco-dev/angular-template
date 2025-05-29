import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromComments from './comments.reducer';

export const selectCommentsState = createFeatureSelector<fromComments.CommentsState>('comments');

export const selectCommentsLoading = createSelector(
    selectCommentsState,
    ({ loading }) => loading
);

export const selectCommentsErrorMessage = createSelector(
    selectCommentsState,
    ({ errorMessage }) => errorMessage
);

export const selectComments = createSelector(
    selectCommentsState,
    fromComments.selectAllComments
);
