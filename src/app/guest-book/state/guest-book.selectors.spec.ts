import { GuestBookState } from './guest-book.reducer';
import {
  selectGuestBookEntries,
  selectGuestBookEntriesErrorMessage,
  selectGuestBookEntriesLoaded,
  selectGuestBookEntriesLoading,
  selectGuestBookEntrySaving,
} from './guest-book.selectors';

describe('Guest Book Selectors', () => {
  const entries = [
    {
      id: 1,
      author: {
        name: 'Name 1',
        email: 'Email 1',
      },
      message: 'Message 1',
    },
    {
      id: 2,
      author: {
        name: 'Name 2',
        email: 'Email 2',
      },
      message: 'Message 2',
    },
  ];

  const initialState: GuestBookState = {
    entities: {
      1: entries[0],
      2: entries[1],
    },
    ids: [1, 2],
    loading: false,
    loaded: false,
    saving: false,
    errorMessage: 'Error Message',
  };

  it('should select entries', () => {
    const result = selectGuestBookEntries.projector(initialState);
    expect(result).toEqual(entries);
  });

  it('should select entries loading', () => {
    const state1 = {
      ...initialState,
      loading: true,
    };

    const state2 = {
      ...initialState,
      loading: false,
    };

    const result1 = selectGuestBookEntriesLoading.projector(state1);
    const result2 = selectGuestBookEntriesLoading.projector(state2);

    expect(result1).toBeTrue();
    expect(result2).toBeFalse();
  });

  it('should select entries loaded', () => {
    const state1 = {
      ...initialState,
      loaded: true,
    };

    const state2 = {
      ...initialState,
      loaded: false,
    };

    const result1 = selectGuestBookEntriesLoaded.projector(state1);
    const result2 = selectGuestBookEntriesLoaded.projector(state2);

    expect(result1).toBeTrue();
    expect(result2).toBeFalse();
  });

  it('should select entries error message', () => {
    const result = selectGuestBookEntriesErrorMessage.projector(initialState);
    expect(result).toEqual('Error Message');
  });

  it('should select entry saving', () => {
    const state1 = {
      ...initialState,
      saving: true,
    };

    const state2 = {
      ...initialState,
      saving: false,
    };

    const result1 = selectGuestBookEntrySaving.projector(state1);
    const result2 = selectGuestBookEntrySaving.projector(state2);

    expect(result1).toBeTrue();
    expect(result2).toBeFalse();
  });
});
