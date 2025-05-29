import { Post } from '../posts.model';
import {
  PostPageActions,
  PostsApiActions,
  PostsPageActions,
} from './posts.actions';
import { postsFeature, PostsState } from './posts.reducer';

describe('Posts Reducer', () => {
  const DEFAULT_STATE: PostsState = {
    ids: [],
    entities: {},
    loading: false,
    loaded: false,
    errorMessage: '',
  };

  const DEFAULT_POST: Post = {
    id: 1,
    userId: 1,
    title: 'Title 1',
    body: 'Body 1',
  };

  describe('PostsPageActions.pageOpened action', () => {
    it('should set loading to true when not loaded', () => {
      const action = PostsPageActions.pageOpened();
      const initialState: PostsState = {
        ...DEFAULT_STATE,
      };
      const expectedState: PostsState = {
        ...DEFAULT_STATE,
        loading: true,
      };

      const result = postsFeature.reducer(initialState, action);

      expect(result).toEqual(expectedState);
    });

    it('should set loading to false when loaded', () => {
      const action = PostsPageActions.pageOpened();
      const initialState: PostsState = {
        ...DEFAULT_STATE,
        loaded: true,
      };
      const expectedState: PostsState = {
        ...initialState,
        loading: false,
      };

      const result = postsFeature.reducer(initialState, action);

      expect(result).toEqual(expectedState);
    });

    it('should reset the error message', () => {
      const action = PostsPageActions.pageOpened();
      const initialState: PostsState = {
        ...DEFAULT_STATE,
        errorMessage: 'Error Message',
        loaded: true,
      };

      const result = postsFeature.reducer(initialState, action);

      expect(result.errorMessage).toEqual('');
    });
  });

  describe('PostPageActions.pageOpened action', () => {
    it('should set loading to true when not loaded', () => {
      const action = PostPageActions.pageOpened();
      const initialState: PostsState = {
        ...DEFAULT_STATE,
      };
      const expectedState: PostsState = {
        ...DEFAULT_STATE,
        loading: true,
      };

      const result = postsFeature.reducer(initialState, action);

      expect(result).toEqual(expectedState);
    });

    it('should set loading to false when loaded', () => {
      const action = PostPageActions.pageOpened();
      const initialState: PostsState = {
        ...DEFAULT_STATE,
        loaded: true,
      };
      const expectedState: PostsState = {
        ...initialState,
        loading: false,
      };

      const result = postsFeature.reducer(initialState, action);

      expect(result).toEqual(expectedState);
    });

    it('should reset the error message', () => {
      const action = PostPageActions.pageOpened();
      const initialState: PostsState = {
        ...DEFAULT_STATE,
        errorMessage: 'Error Message',
        loaded: true,
      };

      const result = postsFeature.reducer(initialState, action);

      expect(result.errorMessage).toEqual('');
    });
  });

  describe('PostsApiActions.postsLoadedSuccess', () => {
    it('should set entities, loading to false and loaded to true', () => {
      const action = PostsApiActions.postsLoadedSuccess({
        posts: [DEFAULT_POST],
      });
      const initialState: PostsState = {
        ...DEFAULT_STATE,
        loading: true,
        loaded: false,
      };
      const expectedState: PostsState = {
        ...DEFAULT_STATE,
        ids: [1],
        entities: {
          1: DEFAULT_POST,
        },
        loading: false,
        loaded: true,
      };

      const result = postsFeature.reducer(initialState, action);

      expect(result).toEqual(expectedState);
    });
  });

  describe('PostsApiActions.postsLoadedFail', () => {
    it('should set error message and loading to false', () => {
      const error = 'Error Message';
      const action = PostsApiActions.postsLoadedFail({ message: error });
      const initialState: PostsState = {
        ...DEFAULT_STATE,
        loading: true,
      };
      const expectedState: PostsState = {
        ...DEFAULT_STATE,
        loading: false,
        errorMessage: error,
      };

      const result = postsFeature.reducer(initialState, action);

      expect(result).toEqual(expectedState);
    });
  });
});
