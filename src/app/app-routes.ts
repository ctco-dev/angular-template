import { Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { GuestBookComponent } from './guest-book/guest-book.component';
import { BlogCommentComponent } from './blog-comment/blog-comment.component';
import { RegisterComponent } from './register/register.component';

export const appRoutes: Routes = [
  { path: 'blogs', component: BlogListComponent, title: "Home - List of blogs" },
  { path: 'blogs/:id', component: BlogCommentComponent, title: "Blog Details" },
  { path: 'guest-book', component: GuestBookComponent, title: "GuestBook - Welcome to guest book" },
  { path: 'register', component: RegisterComponent, title: "Register - welcome" },
  { path: '', redirectTo: '/blogs', pathMatch: 'full' },
];
