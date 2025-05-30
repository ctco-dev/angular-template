import { Component, computed, OnInit } from '@angular/core';
import { PostsListComponent } from '../posts-list/posts-list.component';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  selectPostErrorMessage,
  selectPosts,
  selectPostsLoading,
} from '../state/posts.selectors';
import { PostsPageActions } from '../state/posts.actions';
import { selectUserEntities, selectUserLoading } from 'src/app/users/state/users.selectors';

@Component({
  selector: 'app-posts-page',
  imports: [NgIf, PostsListComponent],
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.scss',
})
export class PostsPageComponent implements OnInit {
  posts = this.store.selectSignal(selectPosts);
  users = this.store.selectSignal(selectUserEntities);
  postsLoading = this.store.selectSignal(selectPostsLoading);
  usersLoading = this.store.selectSignal(selectUserLoading);
  loading = computed(() => this.postsLoading() && this.usersLoading());
  errorMessage = this.store.selectSignal(selectPostErrorMessage);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(PostsPageActions.loadPosts());
  }
}
