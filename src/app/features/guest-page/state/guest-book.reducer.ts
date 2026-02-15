import { createReducer, on } from '@ngrx/store';
import * as GuestBookActions from './guest-book.actions';
import { GuestEntry } from '../models/guest-entry.model';

export interface GuestBookState {
  entries: GuestEntry[];
  selectedEntry: GuestEntry | null;
  showPopup: boolean;
  loading: boolean;
}

export const initialState: GuestBookState = {
  entries: [],
  selectedEntry: null,
  showPopup: false,
  loading: false,
};

export const guestBookReducer = createReducer(
  initialState,
  on(GuestBookActions.loadEntries, (state) => ({
    ...state,
    loading: true,
  })),
  on(GuestBookActions.loadEntriesSuccess, (state, { entries }) => ({
    ...state,
    entries,
    loading: false,
  })),
  on(GuestBookActions.addEntrySuccess, (state, { entry }) => ({
    ...state,
    entries: [entry, ...state.entries],
  })),
  on(GuestBookActions.showAuthorDetails, (state, { entry }) => ({
    ...state,
    selectedEntry: entry,
    showPopup: true,
  })),
  on(GuestBookActions.closeAuthorPopup, (state) => ({
    ...state,
    showPopup: false,
    selectedEntry: null,
  }))
);