import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './guest-book.reducer';

const selectGuestBookState = createFeatureSelector<reducer.GuestBookState>(
  reducer.guestBookFeature.name,
);

export const selectGuestBookEntries = createSelector(
  selectGuestBookState,
  reducer.selectGuestBookEntries,
);

export const selectGuestBookEntriesLoading = createSelector(
  selectGuestBookState,
  (state) => state.loading,
);

export const selectGuestBookEntriesLoaded = createSelector(
  selectGuestBookState,
  (state) => state.loaded,
);

export const selectGuestBookEntriesErrorMessage = createSelector(
  selectGuestBookState,
  (state) => state.loadErrorMessage,
);

export const selectGuestBookEntrySaving = createSelector(
  selectGuestBookState,
  (state) => state.saving,
);
