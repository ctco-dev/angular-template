import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { User } from "../user.model";
import { createFeature, createReducer, on } from "@ngrx/store";
import { UsersGlobalActions, UsersAPIActions } from "./users.actions";

export interface UsersState extends EntityState<User> {
  loading: boolean;
  errorMessage: string;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({});

const initialState: UsersState = adapter.getInitialState({
  loading: false,
  errorMessage: '',
});

export const usersFeature = createFeature({
  name: 'users',
  reducer: createReducer(
    initialState,
    on(UsersGlobalActions.loadUsers, (state: UsersState) => ({
      ...state,
      loading: true,
      errorMessage: '',
    })),
    on(UsersAPIActions.usersLoadedSuccessfully, (state, { users }) =>
      adapter.addMany(users, {
        ...state,
        loading: false,
      })
    ),
    on(UsersAPIActions.usersLoadedFailed, (state, {message}) => ({
      ...state,
      loading: false,
      errorMessage: message,
    }))
  ),
});

export const { selectAll, selectEntities } = adapter.getSelectors();

export const selectUsers = selectAll;
export const selectUsersEntities = selectEntities;
