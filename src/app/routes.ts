import {Routes} from '@angular/router';
import {BlogPostsComponent} from "./blog-posts/blog-posts.component";
import {BlogPostsCommentsComponent} from "./blog-posts/blog-posts-comments/blog-posts-comments.component";

export const routes: Routes = [
  {path: '', redirectTo: '/blogposts', pathMatch: 'full'},
  {path: 'blogposts', component: BlogPostsComponent},
  {path: 'blogposts/:id', component: BlogPostsCommentsComponent},
];
