import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { selectUsersEntities } from 'src/app/users/state/users.selectors';
import { PostCommentsComponent } from '../post-comments/post-comments.component';
import { PostDetailsComponent } from '../post-details/post-details.component';
import { PostsService } from '../posts.service';
import { PostPageActions } from '../state/posts.actions';
import {
  selectPostById,
  selectPostsErrorMessage,
  selectPostsLoading,
} from '../state/posts.selectors';

@Component({
  selector: 'app-post-page',
  imports: [
    PostDetailsComponent,
    PostCommentsComponent,
    RouterLink,
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.scss',
})
export class PostPageComponent implements OnInit {
  private store = inject(Store);
  private postsService = inject(PostsService);

  post = this.store.selectSignal(selectPostById);
  postsLoading = this.store.selectSignal(selectPostsLoading);
  postsErrorMessage = this.store.selectSignal(selectPostsErrorMessage);
  commentsErrorMessage = signal('');

  private users = this.store.selectSignal(selectUsersEntities);
  user = computed(() => {
    if (!this.post()) {
      return undefined;
    }

    return this.users()[this.post()!.userId];
  });

  private postComments$ = toObservable(this.post).pipe(
    filter((p) => Boolean(p)),
    map((p) => p!.id),
    switchMap((id) => this.postsService.getComments(id)),
    catchError((error) => {
      this.commentsErrorMessage.set(error);
      return of([]);
    }),
  );

  postComments = toSignal(this.postComments$, { initialValue: [] });

  ngOnInit(): void {
    this.store.dispatch(PostPageActions.pageOpened());
  }
}
