import { createFeature, createReducer, on } from '@ngrx/store';
import {
  GuestBookAPIActions,
  GuestBookPageActions,
} from './guest-book-entry.actions';
import { GuestBookEntry } from '../guest-book-entry.model';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface GuestBookState {
  loading: boolean;
  errorMessage: string;
  guestBookEntries: GuestBookEntry[];
}

export const adapter: EntityAdapter<GuestBookEntry> = createEntityAdapter<GuestBookEntry>({});

const initialState: GuestBookState = adapter.getInitialState({
  loading: false,
  errorMessage: '',
  guestBookEntries: [],
});

export const guestBookFeature = createFeature({
  name: 'guest-book',
  reducer: createReducer(
    initialState,
    on(GuestBookPageActions.loadGuestBook, (state) => ({
      ...state,
      loading: true,
      errorMessage: '',
      guestBookEntries: [],
    })),
    on(
      GuestBookAPIActions.guestBookEntriesLoadedSuccessfully,
      (state, { guestBookEntries }) => ({
        ...state,
        errorMessage: '',
        loading: false,
        guestBookEntries,
      }),
    ),
    on(
      GuestBookAPIActions.guestBookEntriesLoadedFailed,
      (state, { message }) => ({
        ...state,
        loading: false,
        errorMessage: message,
      }),
    ),
    on(GuestBookPageActions.addGuestBookEntry, (state) => ({
      ...state,
      loading: true,
      errorMessage: '',
    })),
    on(
      GuestBookAPIActions.guestBookEntryAddedSuccessfully,
      (state, { guestBookEntry }) => ({
        ...state,
        loading: false,
        guestBookEntries: [...state.guestBookEntries, guestBookEntry],
      }),
    ),
    on(GuestBookAPIActions.guestBookEntryAddFailed, (state, { message }) => ({
      ...state,
      loading: false,
      errorMessage: message,
    })),
  ),
});

export const { selectAll, selectEntities } = adapter.getSelectors();

export const selectGuestBookEntries = selectAll;
export const selectGuestBookEntryEntities = selectEntities;
