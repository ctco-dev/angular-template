import { createAction, props } from '@ngrx/store';
import { GuestEntry } from '../models/guest-entry.model';

// Load Entries
export const loadEntries = createAction('[Guest Book] Load Entries');
export const loadEntriesSuccess = createAction(
  '[Guest Book] Load Entries Success',
  props<{ entries: GuestEntry[] }>()
);

// Add Entry
export const addEntry = createAction(
  '[Guest Book] Add Entry',
  props<{ entryData: GuestEntry }>()
);
export const addEntrySuccess = createAction(
  '[Guest Book] Add Entry Success',
  props<{ entry: GuestEntry }>()
);

// UI Actions
export const showAuthorDetails = createAction(
  '[Guest Book] Show Author Details',
  props<{ entry: GuestEntry }>()
);
export const closeAuthorPopup = createAction('[Guest Book] Close Author Popup');