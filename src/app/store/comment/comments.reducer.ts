import { createFeature, createReducer, on } from "@ngrx/store";
import { CommentsAPIActions, CommentsComponentActions } from "./comments.actions";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Comment } from "src/app/models/comment.model";

export interface CommentsState extends EntityState<Comment> {
    loading: boolean;
    errorMessage: string;
}

const adapter: EntityAdapter<Comment> = createEntityAdapter<Comment>({});

const initialState: CommentsState = adapter.getInitialState({
    loading: false,
    errorMessage: '',
});

const { selectAll } = adapter.getSelectors();
export const selectAllComments = selectAll;

export const commentsFeature = createFeature({
    name: 'comments',
    reducer: createReducer(
        initialState,
        on(CommentsComponentActions.loadPostComments, (state) =>
            adapter.setAll([], {
                ...state,
                loading: true,
                errorMessage: '',
            })),
        on(CommentsAPIActions.postCommentsLoadedSuccess, (state, { comments }) =>
            adapter.setAll(comments, {
                ...state,
                loading: false,
                comments: comments,
            })),
        on(CommentsAPIActions.postCommentsLoadedFail, (state, { message }) =>
            adapter.setAll([], {
                ...state,
                errorMessage: message,
                loading: false,
            })),
    ),
});