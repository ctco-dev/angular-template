import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { GuestBookEntry } from '../guest-book.model';
import {
  GuestBookApiActions,
  GuestBookPageActions,
} from './guest-book.actions';

export interface GuestBookState extends EntityState<GuestBookEntry> {
  loading: boolean;
  loaded: boolean;
  saving: boolean;
  errorMessage: string;
}

const adapter = createEntityAdapter<GuestBookEntry>({});

const initialState: GuestBookState = adapter.getInitialState({
  loading: false,
  loaded: false,
  saving: false,
  errorMessage: '',
});

export const guestBookFeature = createFeature({
  name: 'guestBook',
  reducer: createReducer(
    initialState,
    on(
      GuestBookPageActions.pageOpened,
      (state): GuestBookState => ({
        ...state,
        loading: !state.loaded,
        errorMessage: '',
      }),
    ),
    on(
      GuestBookPageActions.entrySaved,
      (state): GuestBookState => ({
        ...state,
        saving: true,
      }),
    ),
    on(
      GuestBookApiActions.entriesLoadedSuccess,
      (state, { entries }): GuestBookState =>
        adapter.addMany(entries, {
          ...state,
          loading: false,
          loaded: true,
        }),
    ),
    on(
      GuestBookApiActions.entriesLoadedFail,
      (state, { message }): GuestBookState => ({
        ...state,
        loading: false,
        errorMessage: message,
      }),
    ),
    on(
      GuestBookApiActions.entrySavedSuccess,
      (state, { entry }): GuestBookState =>
        adapter.addOne(entry, {
          ...state,
          saving: false,
        }),
    ),
    // TODO: save error handling
  ),
});

const { selectAll } = adapter.getSelectors();

export const selectGuestBookEntries = selectAll;
