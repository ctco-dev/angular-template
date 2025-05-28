import {Routes} from '@angular/router';
import {BlogPostsRootComponent} from "./blog-posts/blog-posts-root/blog-posts-root.component";
import {BlogPostsCommentsComponent} from "./blog-posts/blog-posts-comments/blog-posts-comments.component";
import {provideState} from '@ngrx/store';
import {blogPostsFeature} from "./blog-posts/blog-posts.store";

const providers = [provideState(blogPostsFeature)];

export const routes: Routes = [
  {path: '', redirectTo: '/blogposts', pathMatch: 'full'},
  {path: 'blogposts', component: BlogPostsRootComponent, providers: providers},
  {path: 'blogposts/:id', component: BlogPostsCommentsComponent},
];
