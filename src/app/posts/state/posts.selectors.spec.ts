import { Post } from '../posts.model';
import { PostsState } from './posts.reducer';
import {
  selectPostById,
  selectPosts,
  selectPostsEntities,
  selectPostsErrorMessage,
  selectPostsLoaded,
  selectPostsLoading,
} from './posts.selectors';

describe('Posts Selectors', () => {
  const posts: Post[] = [
    {
      id: 1,
      userId: 1,
      title: 'Title 1',
      body: 'Body 1',
    },
    {
      id: 2,
      userId: 2,
      title: 'Title 2',
      body: 'Body 2',
    },
  ];

  const entities = {
    1: posts[0],
    2: posts[1],
  };

  const initialState: PostsState = {
    ids: [1, 2],
    entities,
    loading: false,
    loaded: false,
    errorMessage: 'Error Message',
  };

  it('should select posts', () => {
    const result = selectPosts.projector(initialState);
    expect(result).toEqual(posts);
  });

  it('should select posts entities', () => {
    const result = selectPostsEntities.projector(initialState);
    expect(result).toEqual(entities);
  });

  it('should select post by id when route contains param', () => {
    const result = selectPostById.projector(entities, '1');
    expect(result).toEqual(posts[0]);
  });

  it('should return undefined when selecting post by id without route param', () => {
    const result = selectPostById.projector(entities, undefined);
    expect(result).toBeUndefined();
  });

  it('should select posts loading', () => {
    const state1 = {
      ...initialState,
      loading: true,
    };

    const state2 = {
      ...initialState,
      loading: false,
    };

    const result1 = selectPostsLoading.projector(state1);
    const result2 = selectPostsLoading.projector(state2);

    expect(result1).toBeTrue();
    expect(result2).toBeFalse();
  });

  it('should select posts loaded', () => {
    const state1 = {
      ...initialState,
      loaded: true,
    };

    const state2 = {
      ...initialState,
      loaded: false,
    };

    const result1 = selectPostsLoaded.projector(state1);
    const result2 = selectPostsLoaded.projector(state2);

    expect(result1).toBeTrue();
    expect(result2).toBeFalse();
  });

  it('should select posts error message', () => {
    const result = selectPostsErrorMessage.projector(initialState);
    expect(result).toEqual('Error Message');
  });
});
