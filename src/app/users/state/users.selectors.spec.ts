import { User } from '../user.model';
import { UsersState } from './users.reducer';
import {
  selectUsers,
  selectUsersEntities,
  selectUsersErrorMessage,
  selectUsersLoaded,
  selectUsersLoading,
} from './users.selectors';

describe('Users Selectors', () => {
  const users: User[] = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
  ];

  const initialState: UsersState = {
    ids: [1, 2],
    entities: { 1: users[0], 2: users[1] },
    loading: false,
    loaded: false,
    errorMessage: 'Error Message',
  };

  it('should select users', () => {
    const result = selectUsers.projector(initialState);
    expect(result).toEqual(users);
  });

  it('should select users entities', () => {
    const result = selectUsersEntities.projector(initialState);
    expect(result).toEqual({
      1: users[0],
      2: users[1],
    });
  });

  it('should select users loading', () => {
    const state1 = {
      ...initialState,
      loading: true,
    };

    const state2 = {
      ...initialState,
      loading: false,
    };

    const result1 = selectUsersLoading.projector(state1);
    const result2 = selectUsersLoading.projector(state2);

    expect(result1).toBeTrue();
    expect(result2).toBeFalse();
  });

  it('should select users loaded', () => {
    const state1 = {
      ...initialState,
      loaded: true,
    };

    const state2 = {
      ...initialState,
      loaded: false,
    };

    const result1 = selectUsersLoaded.projector(state1);
    const result2 = selectUsersLoaded.projector(state2);

    expect(result1).toBeTrue();
    expect(result2).toBeFalse();
  });

  it('should select users error message', () => {
    const result = selectUsersErrorMessage.projector(initialState);
    expect(result).toEqual('Error Message');
  });
});
