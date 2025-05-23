import { AsyncPipe } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { selectUsersEntities } from 'src/app/users/state/users.selectors';
import { PostCommentsComponent } from '../post-comments/post-comments.component';
import { PostDetailsComponent } from '../post-details/post-details.component';
import { PostsService } from '../posts.service';
import { PostPageActions } from '../state/posts.actions';
import { selectPostById } from '../state/posts.selectors';

@Component({
  selector: 'app-post-page',
  imports: [PostDetailsComponent, PostCommentsComponent, AsyncPipe],
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.scss',
})
export class PostPageComponent implements OnInit {
  private store = inject(Store);
  private postsService = inject(PostsService);

  post = this.store.selectSignal(selectPostById);

  private users = this.store.selectSignal(selectUsersEntities);
  user = computed(() => {
    if (!this.post()) {
      return undefined;
    }

    return this.users()[this.post()!.userId];
  });

  // TODO: there should be a better way
  postComments$ = computed(() => {
    if (!this.post()) {
      return of([]);
    }

    return this.postsService.getComments(this.post()!.id);
  });

  ngOnInit(): void {
    this.store.dispatch(PostPageActions.pageOpened());
  }
}
