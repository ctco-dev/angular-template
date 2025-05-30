import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/blog-posts', pathMatch: 'full' },
  { path: 'blog-posts', loadComponent: () => import('./features/blog-posts/posts-page/posts-page.component').then(m => m.PostsPageComponent) },
  { path: 'blog-posts/:id', loadComponent: () => import('./features/blog-posts/posts-page/posts-page.component').then(m => m.PostsPageComponent) },
  { path: 'guest-book', loadComponent: () => import('./features/guest-page/guest-book/guest-book.component').then(m => m.GuestBookComponent) }
];