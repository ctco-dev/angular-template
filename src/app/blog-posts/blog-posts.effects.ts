import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {BlogPostsService} from './blog-posts.service';
import {BlogPostActions} from './blog-posts.actions';
import {exhaustMap, map} from 'rxjs';

@Injectable()
export class BlogPostsEffects {
  blogPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogPostActions["page-opened"]),
      exhaustMap(() =>
        this.blogPostService.getBlogPosts().pipe(
          map((blogPostList) => BlogPostActions["blog-posts-fetched"]({blogPosts: blogPostList})),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private blogPostService: BlogPostsService) {
  }
}
