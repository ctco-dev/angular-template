import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgIf } from '@angular/common';
import { PostsListComponent } from '../posts-list/posts-list.component';
import { selectPosts, selectPostsErrorMessage, selectPostsLoading } from 'src/app/store/post/posts.selectors';

@Component({
  selector: 'app-posts-page',
  imports: [NgIf, PostsListComponent],
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.scss'
})
export class PostsPageComponent {
  posts = this.store.selectSignal(selectPosts);
  loading = this.store.selectSignal(selectPostsLoading);
  errorMessage = this.store.selectSignal(selectPostsErrorMessage);

  constructor(private store: Store) { }

}
