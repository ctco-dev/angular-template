import { GuestBookEntry } from '../guest-book.model';
import {
  GuestBookApiActions,
  GuestBookPageActions,
} from './guest-book.actions';
import { guestBookFeature, GuestBookState } from './guest-book.reducer';

describe('Guest Book Reducer', () => {
  const DEFAULT_STATE: GuestBookState = {
    ids: [],
    entities: {},
    loading: false,
    loaded: false,
    saving: false,
    errorMessage: '',
  };

  const DEFAULT_ENTRY: GuestBookEntry = {
    id: 1,
    author: {
      name: 'Name 1',
      email: 'author1@example.com',
    },
    message: 'Message 1',
  };

  describe('GuestBookPageActions.pageOpened action', () => {
    it('should set loading to true when not loaded', () => {
      const action = GuestBookPageActions.pageOpened();
      const initialState: GuestBookState = {
        ...DEFAULT_STATE,
      };
      const expectedState: GuestBookState = {
        ...DEFAULT_STATE,
        loading: true,
      };

      const result = guestBookFeature.reducer(initialState, action);

      expect(result).toEqual(expectedState);
    });

    it('should set loading to false when loaded', () => {
      const action = GuestBookPageActions.pageOpened();
      const initialState: GuestBookState = {
        ...DEFAULT_STATE,
        loaded: true,
      };
      const expectedState: GuestBookState = {
        ...initialState,
        loading: false,
      };

      const result = guestBookFeature.reducer(initialState, action);

      expect(result).toEqual(expectedState);
    });

    it('should reset the error message', () => {
      const action = GuestBookPageActions.pageOpened();
      const initialState: GuestBookState = {
        ...DEFAULT_STATE,
        errorMessage: 'Error Message',
        loaded: true,
      };

      const result = guestBookFeature.reducer(initialState, action);

      expect(result.errorMessage).toEqual('');
    });
  });

  describe('GuestBookPageActions.entrySaved', () => {
    it('should set saving to true', () => {
      const action = GuestBookPageActions.entrySaved({ entry: DEFAULT_ENTRY });
      const initialState: GuestBookState = {
        ...DEFAULT_STATE,
        saving: false,
      };
      const expectedState: GuestBookState = {
        ...DEFAULT_STATE,
        saving: true,
      };

      const result = guestBookFeature.reducer(initialState, action);

      expect(result).toEqual(expectedState);
    });
  });

  describe('GuestBookApiActions.entriesLoadedSuccess', () => {
    it('should set entities, loading to false and loaded to true', () => {
      const action = GuestBookApiActions.entriesLoadedSuccess({
        entries: [DEFAULT_ENTRY],
      });
      const initialState: GuestBookState = {
        ...DEFAULT_STATE,
        loading: true,
        loaded: false,
      };
      const expectedState: GuestBookState = {
        ...DEFAULT_STATE,
        ids: [1],
        entities: {
          1: DEFAULT_ENTRY,
        },
        loading: false,
        loaded: true,
      };

      const result = guestBookFeature.reducer(initialState, action);

      expect(result).toEqual(expectedState);
    });
  });

  describe('GuestBookApiActions.entriesLoadedFail', () => {
    it('should set error message and loading to false', () => {
      const error = 'Error Message';
      const action = GuestBookApiActions.entriesLoadedFail({ message: error });
      const initialState: GuestBookState = {
        ...DEFAULT_STATE,
        loading: true,
      };
      const expectedState: GuestBookState = {
        ...DEFAULT_STATE,
        loading: false,
        errorMessage: error,
      };

      const result = guestBookFeature.reducer(initialState, action);

      expect(result).toEqual(expectedState);
    });
  });

  describe('GuestBookApiActions.entrySavedSuccess', () => {
    it('should add entry and set saving to false', () => {
      const action = GuestBookApiActions.entrySavedSuccess({
        entry: DEFAULT_ENTRY,
      });
      const initialState: GuestBookState = {
        ...DEFAULT_STATE,
        saving: true,
      };
      const expectedState: GuestBookState = {
        ...DEFAULT_STATE,
        ids: [1],
        entities: { 1: DEFAULT_ENTRY },
        saving: false,
      };

      const result = guestBookFeature.reducer(initialState, action);

      expect(result).toEqual(expectedState);
    });
  });
});
