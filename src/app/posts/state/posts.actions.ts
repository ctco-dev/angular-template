import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Post } from '../posts.model';

export const PostsPageActions = createActionGroup({
  source: 'Posts Page',
  events: {
    'Page Opened': emptyProps(),
  },
});

export const PostPageActions = createActionGroup({
  source: 'Post Page',
  events: {
    'Page Opened': emptyProps(),
  },
});

export const PostsApiActions = createActionGroup({
  source: 'Posts API',
  events: {
    'Posts Loaded Success': props<{ posts: Post[] }>(),
    'Posts Loaded Fail': props<{ message: string }>(),
  },
});
