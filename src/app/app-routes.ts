import { Routes } from '@angular/router';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { GuestBookListComponent } from './guestBook/guest-book-list/guest-book-list.component';
import { PostsService } from './posts/posts.service';
import { provideState } from '@ngrx/store';
import { postsFeature } from './posts/state/posts.reducer';
import { provideEffects } from '@ngrx/effects';
import { PostsEffects } from './posts/state/posts.effects';
import { UsersEffects } from './users/state/users.effects';
import { usersFeature } from './users/state/users.reducer';

export const appRoutes: Routes = [
  {
    path: 'posts',
    loadChildren: () =>
      import('./posts/posts.routes').then((mod) => mod.routes),
    providers: [
      PostsService,
      provideState(postsFeature),
      provideState(usersFeature),
      provideEffects(PostsEffects, UsersEffects),
    ],
  },
  { path: 'guest-book', component: GuestBookListComponent },
  //{ path: '' }
];
