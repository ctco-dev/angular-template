import { Component, inject, OnInit } from '@angular/core';
import { PostsListComponent } from '../posts-list/posts-list.component';
import { Store } from '@ngrx/store';
import { PostsState } from '../state/posts.reducer';
import { PostsPageActions } from '../state/posts.actions';
import {
  selectPosts,
  selectPostsErrorMessage,
  selectPostsLoading,
} from '../state/posts.selectors';

@Component({
  selector: 'app-posts-page',
  imports: [PostsListComponent],
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.scss',
})
export class PostsPageComponent implements OnInit {
  private store = inject(Store<PostsState>);

  posts = this.store.selectSignal(selectPosts);
  loading = this.store.selectSignal(selectPostsLoading);
  errorMessage = this.store.selectSignal(selectPostsErrorMessage);

  ngOnInit(): void {
    this.store.dispatch(PostsPageActions.pageOpened());
  }
}
