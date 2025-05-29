import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromGuestbook from './guestbook.reducer';

export const selectGuestbookState = createFeatureSelector<fromGuestbook.GuestbookState>('guestbook');

export const selectGuestbookLoading = createSelector(
    selectGuestbookState,
    ({ loading }) => loading
);

export const selectGuestbookErrorMessage = createSelector(
    selectGuestbookState,
    ({ errorMessage }) => errorMessage
);

export const selectGuestbookEntries = createSelector(
    selectGuestbookState,
    fromGuestbook.selectAllGuestbookEntries
);