import { Injectable } from '@angular/core';
import { PostsAPIActions, PostsPageActions } from './posts.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';

@Injectable()
export class PostsEffects {
  // ngrxOnInitEffects() {
  // can be used for 1 time initialiazation and loading data 1 time
  //   return PostsPageActions.loadPosts();
  // }

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsPageActions.loadPosts),
      switchMap(() =>
        this.postsService.getAll().pipe(
          map((posts) => {
            console.log('Posts data received') ;
            return PostsAPIActions.postsLoadedSuccessfully({ posts });
          }),
          catchError((error) =>
            of(PostsAPIActions.postsLoadedFailed({ message: error })),
          ),
        ),
      ),
    ),
  );

  constructor(
    private postsService: PostsService,
    private actions$: Actions
  ) {}
}
