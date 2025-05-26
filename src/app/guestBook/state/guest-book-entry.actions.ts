import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { GuestBookEntry } from '../guest-book-entry.model';

export const PostsPageActions = createActionGroup({
  source: 'GuestBook Page',
  events: {
    'Load GuestBook': emptyProps(),
    'Load GuestBook entry': emptyProps(),
  },
});

export const PostsAPIActions = createActionGroup({
  source: 'GuestBook API',
  events: {
    'Load GuestBookEntries': emptyProps(),
    'GuestBookEntries Loaded Successfully': props<{ posts: GuestBookEntry[] }>(),
    'GuestBookEntries Loaded Failed': props<{ message: string }>(),
  },
});
