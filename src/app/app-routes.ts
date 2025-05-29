import { Routes } from '@angular/router';
import { PostsService } from './posts/posts.service';
import { provideState } from '@ngrx/store';
import { postsFeature } from './posts/state/posts.reducer';
import { provideEffects } from '@ngrx/effects';
import { PostsEffects } from './posts/state/posts.effects';
import { UsersEffects } from './users/state/users.effects';
import { usersFeature } from './users/state/users.reducer';
import { GuestBookService } from './guest-book/guest-book.service';
import { LocalStorageService } from './services/local-storage.service';
import { guestBookFeature } from './guest-book/state/guest-book-entry.reducer';
import { GuestBookEffects } from './guest-book/state/guest-book-entry.effects';

export const appRoutes: Routes = [
  {
    path: 'posts',
    loadChildren: () =>
      import('./posts/posts.routes').then((mod) => mod.routes),
    providers: [
      provideState(postsFeature),
      provideState(usersFeature),
      provideEffects(PostsEffects, UsersEffects),
    ],
  },
  {
    path: 'guest-book',
    loadChildren: () =>
      import('./guest-book/guest-book.routes').then((mod) => mod.routes),
    providers: [
      provideState(guestBookFeature),
      provideEffects(GuestBookEffects),
    ],
  },
  //{ path: '' }
];
