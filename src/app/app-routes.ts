import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { PostsService } from './posts/posts.service';
import { PostsEffects } from './posts/state/posts.effects';
import { postsFeature } from './posts/state/posts.reducer';
import { UsersEffects } from './users/state/users.effects';
import { usersFeature } from './users/state/users.reducer';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
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
      import('./guest-book/guest-book.routes').then((mod) => mod.routes),
  },
];
