import { createFeature, createReducer, on } from "@ngrx/store";
import { PostsAPIActions, PostsPageActions } from "./posts.actions";
import { Post } from "../../models/post.model";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

export interface PostsState extends EntityState<Post> {
    loading: boolean;
    errorMessage: string;
}

const adapter: EntityAdapter<Post> = createEntityAdapter<Post>({
    selectId,
    sortComparer
});

export function selectId(post: Post): number {
    return post.id;
}

export function sortComparer(a: Post, b: Post): number {
    return b.id - a.id;
}

const initialState: PostsState = adapter.getInitialState({
    loading: false,
    errorMessage: '',
});

const { selectEntities, selectAll } = adapter.getSelectors();

export const selectPostEntities = selectEntities;
export const selectAllPosts = selectAll;

export const postsFeature = createFeature({
    name: 'posts',
    reducer: createReducer(
        initialState,
        on(PostsPageActions.loadPosts, (state) =>
            adapter.setAll([], {
                ...state,
                loading: true,
                errorMessage: '',
            })),
        on(PostsAPIActions.postsLoadedSuccess, (state, { posts }) =>
            adapter.setAll(posts, {
                ...state,
                loading: false,
            })),
        on(PostsAPIActions.postsLoadedFail, (state, { message }) =>
            adapter.setAll([], {
                ...state,
                errorMessage: message,
                loading: false,
            })),
    ),
});