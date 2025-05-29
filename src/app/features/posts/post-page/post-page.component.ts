import { Component, effect } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgIf } from '@angular/common';
import { selectComments } from 'src/app/store/comment/comments.selectors';
import { CommentsComponentActions } from 'src/app/store/comment/comments.actions';
import { PostsDetailComponent } from '../post-detail/post-detail.component';
import { selectPostById, selectPostsErrorMessage, selectPostsLoading } from 'src/app/store/post/posts.selectors';

@Component({
  selector: 'app-post-page',
  imports: [NgIf, PostsDetailComponent],
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.scss'
})
export class PostPageComponent {
  loading = this.store.selectSignal(selectPostsLoading);
  errorMessage = this.store.selectSignal(selectPostsErrorMessage);
  post = this.store.selectSignal(selectPostById);
  comments = this.store.selectSignal(selectComments);


  constructor(private store: Store) {
    effect(() => {
      const currentPost = this.post();
      if (currentPost) {
        this.store.dispatch(CommentsComponentActions.loadPostComments({ post: currentPost }));
      }
    });
  }
}
