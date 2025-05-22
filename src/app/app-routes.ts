import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  {
    path: 'posts',
    loadChildren: () =>
      import('./posts/posts.routes').then((mod) => mod.routes),
  },
  {
    path: 'guest-book',
    loadChildren: () =>
      import('./guest-book/guest-book.routes').then((mod) => mod.routes),
  },
];
