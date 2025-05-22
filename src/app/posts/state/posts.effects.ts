import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsService } from '../posts.service';
import { PostsApiActions, PostsPageActions } from './posts.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class PostsEffects {
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsPageActions.pageOpened),
      exhaustMap(() =>
        this.postsService.getPosts().pipe(
          map((posts) => PostsApiActions.postsLoadedSuccess({ posts })),
          catchError((error) =>
            of(PostsApiActions.postsLoadedFail({ message: error })),
          ),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private postsService: PostsService,
  ) {}
}
