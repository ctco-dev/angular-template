import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Post } from '../posts.model';
import { createFeature, createReducer, on } from '@ngrx/store';
import { PostsApiActions, PostsPageActions } from './posts.actions';

export interface PostsState extends EntityState<Post> {
  loading: boolean;
  errorMessage: string;
}

const adapter = createEntityAdapter<Post>({});

const initialState: PostsState = adapter.getInitialState({
  loading: false,
  errorMessage: '',
});

export const postsFeature = createFeature({
  name: 'posts',
  reducer: createReducer(
    initialState,
    on(PostsPageActions.pageOpened, (state) => ({
      ...state,
      loading: true,
      errorMessage: '',
    })),
    on(PostsApiActions.postsLoadedSuccess, (state, { posts }) =>
      adapter.addMany(posts, {
        ...state,
        loading: false,
      }),
    ),
    on(PostsApiActions.postsLoadedFail, (state, { message }) => ({
      ...state,
      loading: false,
      errorMessage: message,
    })),
  ),
});

const { selectAll } = adapter.getSelectors();

export const selectPosts = selectAll;
