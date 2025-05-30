import {concatLatestFrom} from "@ngrx/operators";
import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {BlogPostsService} from './blog-posts.service';
import {BlogPostActions} from './blog-posts.actions';
import {forkJoin, map, switchMap} from 'rxjs';
import {Store} from "@ngrx/store";
import {selectBlogPostById} from "./blog-posts.selectors";

@Injectable()
export class BlogPostsEffects {
  private actions$ = inject(Actions);
  private blogPostService = inject(BlogPostsService);
  private store = inject(Store);

  blogPosts$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(BlogPostActions[`page-opened`]),
          switchMap(() => {
              return this.blogPostService.getBlogPosts().pipe(
                map((blogPosts) => {
                  blogPosts.map(post => ({
                    ...post,
                    comments: []
                  }))
                  return BlogPostActions['blog-posts-fetched']({blogPosts});
                }),
              );
            },
          ),
        );
    }
  );

  comments$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(BlogPostActions[`blog-post-opened`]),
        concatLatestFrom((action) => this.store.select((state) => selectBlogPostById(state, {blogPostId: action.blogPostId}))),
        switchMap(([action, blogPost]) => {
          const blogPostId = action.blogPostId;
          const observables = [];
          if (!blogPost) {
            observables.push(this.blogPostService.getBlogPostById(blogPostId).pipe(map((blogPost) => {
              blogPost.comments = [];
              return BlogPostActions['blog-post-fetched']({blogPost});
            })));
          }
          observables.push(this.blogPostService.getBlogPostCommentsById(blogPostId).pipe(map((comments) => BlogPostActions['blog-post-comments-fetched']({blogPostId, blogPostComments: comments,}))));
          return forkJoin(observables);
        }),
        switchMap((actions) => actions)
      ))
}
