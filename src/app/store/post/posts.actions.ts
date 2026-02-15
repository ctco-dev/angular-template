import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Post } from "../../models/post.model";

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
    'Posts Loaded Success': props<{ posts: Post[] }>(),
    'Posts Loaded Fail': props<{ message: string }>(),
  },
});
