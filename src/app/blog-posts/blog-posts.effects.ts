import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {BlogPostsService} from './blog-posts.service';
import {BlogPostActions} from './blog-posts.actions';
import {map, switchMap} from 'rxjs';

@Injectable()
export class BlogPostsEffects {
  private actions$ = inject(Actions);
  private blogPostService = inject(BlogPostsService);

  blogPosts$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(BlogPostActions[`page-opened`]),
        switchMap(() =>
          this.blogPostService.getBlogPosts().pipe(
            map((blogPosts) => BlogPostActions['blog-posts-fetched']({blogPosts: blogPosts})),
          ),
        ),
      )
    // .pipe(
    //   ofType(BlogPostActions[`blog-post-opened`]),
    //   switchMap((props) =>
    //     this.blogPostService.getBlogPostCommentsById(props.blogPostId).pipe(
    //       map((blogPostComments) => BlogPostActions['blog-post-comments-fetched']({blogPostComments: blogPostComments})),
    //     ),
    //   ),
    // ),
  );
}
