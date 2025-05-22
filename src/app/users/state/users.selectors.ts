import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './users.reducer';

const selectUsersState = createFeatureSelector<reducer.UsersState>(
  reducer.usersFeature.name,
);

export const selectUsers = createSelector(
  selectUsersState,
  reducer.selectUsers,
);

export const selectUsersDictionary = createSelector(
  selectUsersState,
  reducer.selectUsersDictionary,
);

export const selectUsersLoading = createSelector(
  selectUsersState,
  (state) => state.loading,
);

export const selectUsersErrorMessage = createSelector(
  selectUsersState,
  (state) => state.errorMessage,
);
