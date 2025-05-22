import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as reducer from './users.reducer';

const selectUsersState = createFeatureSelector<reducer.UsersState>(
  reducer.usersFeature.name,
);

export const selectUsers = createSelector(
  selectUsersState,
  reducer.selectUsers,
);

export const selectUserById = (id: number) =>
  createSelector(selectUsersEntities, (entities) => entities[id]);

export const selectUsersEntities = createSelector(
  selectUsersState,
  reducer.selectUsersEntities,
);

export const selectUsersLoading = createSelector(
  selectUsersState,
  (state) => state.loading,
);

export const selectUsersLoaded = createSelector(
  selectUsersState,
  (state) => state.loaded,
);

export const selectUsersErrorMessage = createSelector(
  selectUsersState,
  (state) => state.errorMessage,
);
