import { Injectable } from '@angular/core';
import { PostsAPIActions, PostsPageActions } from './posts.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class PostsEffects {
  ngrxOnInitEffects() {
    return PostsPageActions.loadPosts();
  }

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsPageActions.loadPosts),
      exhaustMap(() =>
        this.postsService.getAll().pipe(
          map((posts) => {
            console.log('Data received') ;
            return PostsAPIActions.postsLoadedSuccessfully({ posts });
          } ),
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
