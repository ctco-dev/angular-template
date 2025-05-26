import { Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { GuestBookComponent } from './guest-book/guest-book.component';

export const appRoutes: Routes = [
  { path: 'blogs', component: BlogListComponent, title: "Home - List of blogs" },
  { path: 'guest-book', component: GuestBookComponent, title: "GuestBook - Welcome to guest book" },
  { path: '', redirectTo: '/blogs', pathMatch: 'full' },
];
