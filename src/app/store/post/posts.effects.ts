import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostsAPIActions, PostsPageActions } from "./posts.actions";
import { catchError, concatMap, map, of } from "rxjs";
import { PostService } from "src/app/apis/post.service";

@Injectable()
export class PostsEffects {

    ngrxOnInitEffects() {
        return PostsPageActions.loadPosts();
    }

    constructor(
        private postsServiss: PostService,
        private actions$: Actions
    ) { }

    loadPosts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostsPageActions.loadPosts),
            concatMap(() =>
                this.postsServiss.getAll().pipe(
                    map((posts) => PostsAPIActions.postsLoadedSuccess({ posts })),
                    catchError((error) =>
                        of(PostsAPIActions.postsLoadedFail({ message: error }))
                    )
                )
            )
        )
    );
}