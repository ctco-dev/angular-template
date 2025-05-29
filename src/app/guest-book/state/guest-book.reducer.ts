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
  loadErrorMessage: string;
  saving: boolean;
  saveErrorMessage: string;
}

const adapter = createEntityAdapter<GuestBookEntry>({});

const initialState: GuestBookState = adapter.getInitialState({
  loading: false,
  loaded: false,
  loadErrorMessage: '',
  saving: false,
  saveErrorMessage: '',
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
        loadErrorMessage: '',
      }),
    ),
    on(
      GuestBookPageActions.entrySaved,
      (state): GuestBookState => ({
        ...state,
        saving: true,
        saveErrorMessage: '',
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
        loadErrorMessage: message,
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
    on(
      GuestBookApiActions.entrySavedFail,
      (state, { message }): GuestBookState => ({
        ...state,
        loading: false,
        saveErrorMessage: message,
      }),
    ),
  ),
});

const { selectAll } = adapter.getSelectors();

export const selectGuestBookEntries = selectAll;
