import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {IBlogPost, IBlogPostComment} from "./blog-posts.model";

export const BlogPostActions = createActionGroup({
  source: 'Blog Posts',
  events: {
    'page-opened': emptyProps(),
    'blog-posts-fetched': props<{ blogPosts: IBlogPost[] }>(),
    'blog-post-opened': props<{ blogPostId: number }>(),
    'blog-post-comments-fetched': props<{ blogPostComments: IBlogPostComment[] }>(),
  },
});
