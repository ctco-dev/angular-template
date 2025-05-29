import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { selectCommentsLoading } from 'src/app/store/comment/comments.selectors';
import { Comment } from 'src/app/models/comment.model';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-posts-detail',
  standalone: true,
  imports: [
    MatCardModule,
    NgIf,
    NgFor,
    MatIconModule,
    MatButton
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostsDetailComponent {
  @Input() post: Post | undefined;
  @Input() comments: Comment[] | null = [];
  loadingComments = this.store.selectSignal(selectCommentsLoading);

  constructor(private store: Store, private router: Router) { }

  goBack() {
    this.router.navigate(['/']);
  }
}
