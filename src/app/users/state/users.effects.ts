import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, filter, map, of, withLatestFrom } from 'rxjs';
import {
  PostPageActions,
  PostsPageActions,
} from 'src/app/posts/state/posts.actions';
import { UsersService } from '../users.service';
import { UsersApiActions } from './users.actions';
import { UsersState } from './users.reducer';
import { selectUsersLoaded } from './users.selectors';

@Injectable()
export class UsersEffects {
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsPageActions.pageOpened, PostPageActions.pageOpened),
      withLatestFrom(this.store.select(selectUsersLoaded)),
      filter((_, loaded) => !loaded),
      exhaustMap(() =>
        this.usersService.getUsers().pipe(
          map((users) => UsersApiActions.usersLoadedSuccess({ users })),
          catchError((error) =>
            of(UsersApiActions.usersLoadedFail({ message: error })),
          ),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private store: Store<UsersState>,
    private usersService: UsersService,
  ) {}
}
