import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, filter, map, of, withLatestFrom } from 'rxjs';
import { PostsService } from '../posts.service';
import {
  PostPageActions,
  PostsApiActions,
  PostsPageActions,
} from './posts.actions';
import { PostsState } from './posts.reducer';
import { selectPostsLoaded } from './posts.selectors';

@Injectable()
export class PostsEffects {
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsPageActions.pageOpened, PostPageActions.pageOpened),
      withLatestFrom(this.store.select(selectPostsLoaded)),
      filter((_, loaded) => !loaded),
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
    private store: Store<PostsState>,
    private postsService: PostsService,
  ) {}
}
