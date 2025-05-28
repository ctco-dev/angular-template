import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {IBlogPost} from "./blog-posts.model";

export const BlogPostActions = createActionGroup({
  source: 'Blog Posts',
  events: {
    'page-opened': emptyProps(),
    'blog-posts-fetched': props<{ blogPosts: IBlogPost[] }>(),
  },
});
