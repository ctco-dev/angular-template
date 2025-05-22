import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { Post } from '../posts.model';
import { PostsApiActions, PostsPageActions } from './posts.actions';

export interface PostsState extends EntityState<Post> {
  loading: boolean;
  loaded: boolean;
  errorMessage: string;
}

const adapter = createEntityAdapter<Post>({});

const initialState: PostsState = adapter.getInitialState({
  loading: false,
  loaded: false,
  errorMessage: '',
});

export const postsFeature = createFeature({
  name: 'posts',
  reducer: createReducer(
    initialState,
    on(
      PostsPageActions.pageOpened,
      PostsPageActions.pageOpened,
      (state): PostsState => ({
        ...state,
        loading: !state.loaded,
        errorMessage: '',
      }),
    ),
    on(PostsApiActions.postsLoadedSuccess, (state, { posts }) =>
      adapter.addMany(posts, {
        ...state,
        loading: false,
        loaded: true,
      }),
    ),
    on(
      PostsApiActions.postsLoadedFail,
      (state, { message }): PostsState => ({
        ...state,
        loading: false,
        errorMessage: message,
      }),
    ),
  ),
});

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectPosts = selectAll;
export const selectPostsEntities = selectEntities;
