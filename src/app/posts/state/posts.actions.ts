import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Post } from '../post';

export const PostsPageActions = createActionGroup({
  source: 'Posts Page',
  events: {
    'Load Posts': emptyProps(),
  },
});

export const PostsAPIActions = createActionGroup({
  source: 'Posts API',
  events: {
    'Load Posts': emptyProps(),
    'Posts Loaded Successfully': props<{ posts: Post[] }>(),
    'Posts Loaded Failed': props<{ message: string }>(),
  },
});
