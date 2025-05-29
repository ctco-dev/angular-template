import { Routes } from '@angular/router';
import { GuestBookComponent } from './components/guest-page/guest-book/guest-book.component';
import { PostsPageComponent } from './components/blog-posts/posts-page/posts-page.component';
import { PostDetailsPageComponent } from './components/blog-posts/post-details-page/post-details-page.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/blog-posts', pathMatch: 'full' },
  { path: 'blog-posts', component: PostsPageComponent },
  { path: 'blog-posts/:id', component: PostDetailsPageComponent },
  { path: 'guest-book', component: GuestBookComponent }
];