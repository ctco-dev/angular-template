import { Component, computed, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUsersEntities } from 'src/app/users/state/users.selectors';
import { PostDetailsComponent } from '../post-details/post-details.component';
import { PostPageActions } from '../state/posts.actions';
import { PostsState } from '../state/posts.reducer';
import { selectPostById } from '../state/posts.selectors';

@Component({
  selector: 'app-post-page',
  imports: [PostDetailsComponent],
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.scss',
})
export class PostPageComponent implements OnInit {
  private store = inject(Store<PostsState>);

  post = this.store.selectSignal(selectPostById);

  private users = this.store.selectSignal(selectUsersEntities);
  user = computed(() => {
    if (!this.post()) {
      return undefined;
    }

    return this.users()[this.post()!.userId];
  });

  ngOnInit(): void {
    this.store.dispatch(PostPageActions.pageOpened());
  }
}
