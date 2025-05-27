import { Component, computed, OnInit, Signal } from '@angular/core';
import { Post } from '../post';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { User } from 'src/app/users/user.model';
import { Observable } from 'rxjs';
import { PostsService } from '../posts.service';
import { Store } from '@ngrx/store';
import {
  selectPostById,
  selectPostErrorMessage,
  selectPostId,
  selectPostsLoading,
} from '../state/posts.selectors';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { PostsPageActions } from '../state/posts.actions';
import {
  selectUserEntities,
  selectUserLoading,
} from 'src/app/users/state/users.selectors';
import { Comment } from '../comment';

@Component({
  selector: 'app-post-details',
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    MatCardModule,
    MatButtonModule,
    MatListModule,
  ],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
})
export class PostDetailsComponent implements OnInit {
  post: Signal<Post | undefined> = this.store.selectSignal(selectPostById);
  postId = this.store.selectSignal(selectPostId);
  postsLoading = this.store.selectSignal(selectPostsLoading);
  usersLoading = this.store.selectSignal(selectUserLoading);
  loading = computed(() => this.postsLoading() && this.usersLoading());
  errorMessage = this.store.selectSignal(selectPostErrorMessage);
  private users = this.store.selectSignal(selectUserEntities);
  user = computed(() => {
    let result: User | null = null;
    let localPost = this.post();
    if (!localPost) {
      return result;
    }

    result = this.users()[localPost.userId.toString()] ?? null;
    return result;
  });

  comments$!: Observable<Comment[]>;

  constructor(
    private store: Store,
    private postsService: PostsService,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(PostsPageActions.loadPost());
    this.comments$ = this.postsService.getCommentsById(this.postId());
  }

  commentIdent(index: number, item: Comment) {
    return item ? item.id : undefined;
  }
}
