import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { PostsPageActions } from 'src/app/posts/state/posts.actions';
import { UsersService } from '../users.service';
import { UsersApiActions } from './users.actions';

@Injectable()
export class UsersEffects {
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsPageActions.pageOpened),
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
    private usersService: UsersService,
  ) {}
}
