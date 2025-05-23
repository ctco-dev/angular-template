import { Routes } from '@angular/router';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { GuestBookListComponent } from './guestBook/guest-book-list/guest-book-list.component';
import { PostsService } from './posts/posts.service';
import { provideState } from '@ngrx/store';
import { postsFeature } from './posts/state/posts.reducer';
import { provideEffects } from '@ngrx/effects';
import { PostsEffects } from './posts/state/posts.effects';

export const appRoutes: Routes = [
  {
    path: 'posts',
    component: PostsListComponent,
    providers: [
      PostsService,
      provideState(postsFeature),
      provideEffects(PostsEffects),
    ],
  },
  { path: 'guest-book', component: GuestBookListComponent },
  //{ path: '' }
];
