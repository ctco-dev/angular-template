import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsService } from '../services/posts.service';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as PostsActions from './posts.actions';

@Injectable()
export class PostsEffects {
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.loadPosts),
      mergeMap(() =>
        this.postsService.getPosts().pipe(
          map((posts) => PostsActions.loadPostsSuccess({ posts })),
          catchError((error) =>
            of(PostsActions.loadPostsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.loadComments),
      mergeMap((action) =>
        this.postsService.getComments(action.postId).pipe(
          map((comments) => PostsActions.loadCommentsSuccess({ comments })),
          catchError((error) =>
            of(PostsActions.loadCommentsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private postsService: PostsService) {}
}