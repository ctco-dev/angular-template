import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, filter, map, of } from 'rxjs';
import {
  PostPageActions,
  PostsPageActions,
} from 'src/app/posts/state/posts.actions';
import { UsersService } from '../users.service';
import { UsersApiActions } from './users.actions';
import { selectUsersLoaded } from './users.selectors';

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsPageActions.pageOpened, PostPageActions.pageOpened),
      concatLatestFrom(() => this.store.select(selectUsersLoaded)),
      filter(([, loaded]) => !loaded),
      exhaustMap(() =>
        this.usersService.getUsers().pipe(
          map((users) => UsersApiActions.usersLoadedSuccess({ users })),
          catchError((error) =>
            of(UsersApiActions.usersLoadedFail({ message: error })),
          ),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store,
    private usersService: UsersService,
  ) {}
}
