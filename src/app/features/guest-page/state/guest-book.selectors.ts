import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GuestBookState } from './guest-book.reducer';

export const selectGuestBookState = createFeatureSelector<GuestBookState>('guestBook');

export const selectEntries = createSelector(
  selectGuestBookState,
  (state) => state.entries
);

export const selectShowPopup = createSelector(
  selectGuestBookState,
  (state) => state.showPopup
);

export const selectSelectedEntry = createSelector(
  selectGuestBookState,
  (state) => state.selectedEntry
);