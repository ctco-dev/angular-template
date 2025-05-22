import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { PostsPageActions } from 'src/app/posts/state/posts.actions';
import { User } from '../user.model';
import { UsersApiActions } from './users.actions';

export interface UsersState extends EntityState<User> {
  loading: boolean;
  errorMessage: string;
}

const adapter = createEntityAdapter<User>({});

const initialState: UsersState = adapter.getInitialState({
  loading: false,
  errorMessage: '',
});

export const usersFeature = createFeature({
  name: 'users',
  reducer: createReducer(
    initialState,
    on(PostsPageActions.pageOpened, (state) => ({
      ...state,
      loading: true,
      errorMessage: '',
    })),
    on(UsersApiActions.usersLoadedSuccess, (state, { users }) =>
      adapter.addMany(users, {
        ...state,
        loading: false,
      }),
    ),
    on(UsersApiActions.usersLoadedFail, (state, { message }) => ({
      ...state,
      loading: false,
      errorMessage: message,
    })),
  ),
});

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectUsers = selectAll;
export const selectUsersDictionary = selectEntities;
