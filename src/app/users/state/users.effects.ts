import { Injectable } from "@angular/core";
import { UsersGlobalActions, UsersAPIActions } from "./users.actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { UsersService } from "../users.service";

@Injectable()
export class UsersEffects {
  ngrxOnInitEffects() {
  //can be used for 1 time initialiazation and loading data 1 time
    console.log('Global effects init')
    return UsersGlobalActions.loadUsers();
  }

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersGlobalActions.loadUsers),
      exhaustMap(() =>
        this.usersService.getAll().pipe(
          map((users) => {
            console.log('User data received') ;
            return UsersAPIActions.usersLoadedSuccessfully({ users });
          }),
          catchError((error) =>
            of(UsersAPIActions.usersLoadedFailed({ message: error })),
          ),
        ),
      ),
    ),
  );

  constructor(
    private usersService: UsersService,
    private actions$: Actions
  ) {}
}
