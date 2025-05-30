import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { signal, effect } from '@angular/core';

import * as PostsActions from '../state/posts.actions';
import { selectAllPosts, selectLoading } from '../state/posts.selectors';
import { Post } from '../models/comment.model';

@Component({
  selector: 'app-posts-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterModule,
  ],
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss'],
})
export class PostsPageComponent {
  private store = inject(Store);

  posts = signal<Post[]>([]);
  loading = signal(false);

  constructor() {
    this.store.dispatch(PostsActions.loadPosts());

    effect(() => {
      this.store.select(selectAllPosts).subscribe((posts) => {
        this.posts.set(posts);
      });
    });

    effect(() => {
      this.store.select(selectLoading).subscribe((loading) => {
        this.loading.set(loading);
      });
    });
  }
}