import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {BlogPostsService} from './blog-posts.service';
import {BlogPostActions} from './blog-posts.actions';
import {filter, map, switchMap, withLatestFrom} from 'rxjs';
import {selectAllBlogPostComments} from "./blog-posts.selectors";
import {Store} from "@ngrx/store";

@Injectable()
export class BlogPostsEffects {
  private actions$ = inject(Actions);
  private blogPostService = inject(BlogPostsService);
  private store = inject(Store);

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
  );

  comments$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(BlogPostActions[`blog-post-opened`]),
        withLatestFrom(this.store.select(selectAllBlogPostComments)),
        filter(([props, posts]) => posts.has(props.blogPostId)),
        switchMap(([props]) =>
          this.blogPostService.getBlogPostCommentsById(props.blogPostId).pipe(
            map((blogPostComments) => BlogPostActions['blog-post-comments-fetched']({blogPostComments: blogPostComments, id: props.blogPostId})),
          ),
        ),
      ),)
}
