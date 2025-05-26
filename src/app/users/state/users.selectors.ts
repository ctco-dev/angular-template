import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducerUsers from './users.reducer';

export const selectUserState =
  createFeatureSelector<reducerUsers.UsersState>('users');

export const selectUsers = createSelector(
  selectUserState,
  reducerUsers.selectUsers,
);

export const selectUserEntities = createSelector(
  selectUserState,
  reducerUsers.selectUsersEntities,
);

export const selectUserLoading = createSelector(
  selectUserState,
  (state) => state.loading,
);

export const selectPostErrorMessage = createSelector(
  selectUserState,
  (state) => state.errorMessage,
);
