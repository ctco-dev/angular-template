import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { signal, effect } from '@angular/core';

import * as PostsActions from '../state/posts.actions';
import { selectPostById, selectComments, selectLoading } from '../state/posts.selectors';
import { Post, Comment } from '../models/comment.model';

@Component({
  selector: 'app-post-details-page',
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './post-details-page.component.html',
  styleUrls: ['./post-details-page.component.scss'],
})
export class PostDetailsPageComponent {
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  post = signal<Post | null>(null);
  comments = signal<Comment[]>([]);
  loading = signal(false);

  constructor() {
    const postId = Number(this.route.snapshot.paramMap.get('id'));

    effect(() => {
      this.store.select(selectPostById(postId)).subscribe((post) => {
        if (post != undefined) {
          this.post.set(post);
        }
      });
    });

    effect(() => {
      this.store.select(selectComments).subscribe((comments) => {
        this.comments.set(comments);
      });
    });

    effect(() => {
      this.store.select(selectLoading).subscribe((loading) => {
        this.loading.set(loading);
      });
    });

    this.store.dispatch(PostsActions.loadComments({ postId }));
  }
}