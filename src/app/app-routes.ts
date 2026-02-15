import { Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { GuestBookComponent } from './guest-book/guest-book.component';
import { BlogCommentComponent } from './blog-comment/blog-comment.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';

export const appRoutes: Routes = [
  { path: 'blogs', component: BlogListComponent, title: "Home - List of blogs" },
  { path: 'blogs/:id', component: BlogCommentComponent, title: "Blog Details" },
  { path: 'guest-book', component: GuestBookComponent, title: "GuestBook - Welcome to guest book" },
  { path: 'register', component: RegisterComponent, title: "Register - welcome" },
  { path: 'login', component: LoginComponent, title: "Login - welcome" },
  { path: '', redirectTo: '/blogs', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent, title: "Page Not Found" } 
];
