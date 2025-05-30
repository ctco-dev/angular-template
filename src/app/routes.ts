import {Routes} from '@angular/router';
import {BlogPostsRootComponent} from "./blog-posts/blog-posts-root/blog-posts-root.component";
import {BlogPostsCommentsComponent} from "./blog-posts/blog-posts-comments/blog-posts-comments.component";
import {provideState} from '@ngrx/store';
import {blogPostsFeature} from "./blog-posts/blog-posts.store";
import {BlogPostsService} from "./blog-posts/blog-posts.service";
import {BlogPostsEffects} from "./blog-posts/blog-posts.effects";
import {provideEffects} from "@ngrx/effects";

const blogPostProviders = [BlogPostsService, provideState(blogPostsFeature), provideEffects(BlogPostsEffects)];

export const routes: Routes = [
  {path: '', redirectTo: '/blogposts', pathMatch: 'full'},
  {path: 'blogposts', component: BlogPostsRootComponent, providers: blogPostProviders},
  {path: 'blogposts/:id', component: BlogPostsCommentsComponent, providers: blogPostProviders},
];
