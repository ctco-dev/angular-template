import { Routes } from '@angular/router';
import { PostsService } from './posts/posts.service';
import { provideState } from '@ngrx/store';
import { postsFeature } from './posts/state/posts.reducer';
import { provideEffects } from '@ngrx/effects';
import { PostsEffects } from './posts/state/posts.effects';
import { UsersEffects } from './users/state/users.effects';
import { usersFeature } from './users/state/users.reducer';
import { GuestBookPageComponent } from './guestBook/guest-book-page/guest-book-page.component';
import { GuestBookService } from './guestBook/guest-book.service';

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
  {
    path: 'guest-book',
    loadChildren: () =>
      import('./guestBook/guest-book.routes').then((mod) => mod.routes),
    providers: [
      GuestBookService
    ],
  },
  //{ path: '' }
];
