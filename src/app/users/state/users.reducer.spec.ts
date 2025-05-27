import {
  PostPageActions,
  PostsPageActions,
} from 'src/app/posts/state/posts.actions';
import { User } from '../user.model';
import { UsersApiActions } from './users.actions';
import { usersFeature, UsersState } from './users.reducer';

describe('Users Reducer', () => {
  const DEFAULT_STATE: UsersState = {
    ids: [],
    entities: {},
    loading: false,
    loaded: false,
    errorMessage: '',
  };

  const DEFAULT_USER: User = {
    id: 1,
    name: 'User 1',
  };

  describe('PostsPageAction.pageOpened action', () => {
    it('should set loading to true when not loaded', () => {
      const action = PostsPageActions.pageOpened();
      const initialState: UsersState = {
        ...DEFAULT_STATE,
      };
      const expectedState: UsersState = {
        ...DEFAULT_STATE,
        loading: true,
      };

      const result = usersFeature.reducer(initialState, action);

      expect(result).toEqual(expectedState);
    });

    it('should set loading to false when loaded', () => {
      const action = PostsPageActions.pageOpened();
      const initialState: UsersState = {
        ...DEFAULT_STATE,
        loaded: true,
      };
      const expectedState: UsersState = {
        ...initialState,
        loading: false,
      };

      const result = usersFeature.reducer(initialState, action);

      expect(result).toEqual(expectedState);
    });

    it('should reset the error message', () => {
      const action = PostsPageActions.pageOpened();
      const initialState: UsersState = {
        ...DEFAULT_STATE,
        errorMessage: 'Error Message',
        loaded: true,
      };

      const result = usersFeature.reducer(initialState, action);

      expect(result.errorMessage).toEqual('');
    });
  });

  describe('PostPageAction.pageOpened action', () => {
    it('should set loading to true when not loaded', () => {
      const action = PostPageActions.pageOpened();
      const initialState: UsersState = {
        ...DEFAULT_STATE,
      };
      const expectedState: UsersState = {
        ...DEFAULT_STATE,
        loading: true,
      };

      const result = usersFeature.reducer(initialState, action);

      expect(result).toEqual(expectedState);
    });

    it('should set loading to false when loaded', () => {
      const action = PostPageActions.pageOpened();
      const initialState: UsersState = {
        ...DEFAULT_STATE,
        loaded: true,
      };
      const expectedState: UsersState = {
        ...initialState,
        loading: false,
      };

      const result = usersFeature.reducer(initialState, action);

      expect(result).toEqual(expectedState);
    });

    it('should reset the error message', () => {
      const action = PostPageActions.pageOpened();
      const initialState: UsersState = {
        ...DEFAULT_STATE,
        errorMessage: 'Error Message',
        loaded: true,
      };

      const result = usersFeature.reducer(initialState, action);

      expect(result.errorMessage).toEqual('');
    });
  });

  describe('UsersApiActions.entriesLoadedSuccess', () => {
    it('should set entities, loading to false and loaded to true', () => {
      const action = UsersApiActions.usersLoadedSuccess({
        users: [DEFAULT_USER],
      });
      const initialState: UsersState = {
        ...DEFAULT_STATE,
        loading: true,
        loaded: false,
      };
      const expectedState: UsersState = {
        ...DEFAULT_STATE,
        ids: [1],
        entities: {
          1: DEFAULT_USER,
        },
        loading: false,
        loaded: true,
      };

      const result = usersFeature.reducer(initialState, action);

      expect(result).toEqual(expectedState);
    });
  });

  describe('UsersApiActions.entriesLoadedFail', () => {
    it('should set error message and loading to false', () => {
      const error = 'Error Message';
      const action = UsersApiActions.usersLoadedFail({ message: error });
      const initialState: UsersState = {
        ...DEFAULT_STATE,
        loading: true,
      };
      const expectedState: UsersState = {
        ...DEFAULT_STATE,
        loading: false,
        errorMessage: error,
      };

      const result = usersFeature.reducer(initialState, action);

      expect(result).toEqual(expectedState);
    });
  });
});
