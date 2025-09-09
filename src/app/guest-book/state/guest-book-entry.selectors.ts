import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getRouterSelectors } from '@ngrx/router-store';
import * as reducerGuestBook from './guest-book-entry.reducer';

export const selectGuestBookState =
  createFeatureSelector<reducerGuestBook.GuestBookState>('guest-book');

export const selectGuestBookLoading = createSelector(
  selectGuestBookState,
  ({ loading }) => loading
);

export const selectGuestBookEntries = createSelector(
  selectGuestBookState,
  ({ guestBookEntries }) => guestBookEntries
);

export const selectGuestBookErrorMessage = createSelector(
  selectGuestBookState,
  ({ errorMessage }) => errorMessage
);

export const { selectRouteParams } = getRouterSelectors();

export const selectGuestBookEntryById = createSelector(
  selectRouteParams,
  selectGuestBookState,
  ({ id }, { guestBookEntries }) =>
    guestBookEntries.find((guestBookEntry) => guestBookEntry.id === id)
);
