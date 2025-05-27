import {Routes} from '@angular/router';
import {BlogPostsComponent} from "./blog-posts/blog-posts.component";

export const routes: Routes = [
  {path: '', redirectTo: '/blogposts', pathMatch: 'full'},
  {path: 'blogposts', component: BlogPostsComponent},
];
