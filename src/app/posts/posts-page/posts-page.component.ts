import { Component } from '@angular/core';
import { PostsListComponent } from '../posts-list/posts-list.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  selectPostErrorMessage,
  selectPosts,
  selectPostsLoading,
} from '../state/posts.selectors';

@Component({
  selector: 'app-posts-page',
  imports: [NgIf, AsyncPipe, PostsListComponent],
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.scss',
})
export class PostsPageComponent {
  posts = this.store.selectSignal(selectPosts);

  loading = this.store.selectSignal(selectPostsLoading);
  errorMessage = this.store.selectSignal(selectPostErrorMessage);

  constructor(private store: Store) {}
}
