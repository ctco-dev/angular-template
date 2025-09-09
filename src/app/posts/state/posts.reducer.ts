import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Post } from "../post";
import { createFeature, createReducer, on } from "@ngrx/store";
import { PostsAPIActions, PostsPageActions } from "./posts.actions";

export interface PostsState extends EntityState<Post> {
  loading: boolean;
  errorMessage: string;
}

export const adapter: EntityAdapter<Post> = createEntityAdapter<Post>({});

const initialState: PostsState = adapter.getInitialState({
  loading: false,
  errorMessage: '',
});

export const postsFeature = createFeature({
  name: 'posts',
  reducer: createReducer(
    initialState,
    on(PostsPageActions.loadPosts, (state: PostsState) => ({
      ...state,
      loading: true,
      errorMessage: '',
    })),
    on(PostsAPIActions.postsLoadedSuccessfully, (state, { posts }) =>
      adapter.addMany(posts, {
        ...state,
        loading: false,
      })
    ),
    on(PostsAPIActions.postsLoadedFailed, (state, {message}) => ({
      ...state,
      loading: false,
      errorMessage: message,
    }))
  ),
});


export const { selectAll, selectEntities } = adapter.getSelectors();

export const selectPosts = selectAll;
export const selectPostsEntities = selectEntities;
