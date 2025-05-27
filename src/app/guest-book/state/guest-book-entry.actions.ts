import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { GuestBookEntry } from '../guest-book-entry.model';

export const PostsPageActions = createActionGroup({
  source: 'GuestBook Page',
  events: {
    'Load GuestBook': emptyProps(),
    'Load GuestBook Entry': emptyProps(),
    'Add GuestBook Entry': props<{guestBookEntry: GuestBookEntry}>(), // unused
  },
});

export const PostsAPIActions = createActionGroup({
  source: 'GuestBook API',
  events: {
    'Load GuestBookEntries': emptyProps(),
    'GuestBookEntries Loaded Successfully': props<{ posts: GuestBookEntry[] }>(),
    'GuestBookEntries Loaded Failed': props<{ message: string }>(),
    'GuestBookEntry Added Successfully': props<{ guestBookEntry: GuestBookEntry }>(), // unused
    'GuestBookEntry Add Failed': props<{ message: string }>(), // unused
  },
});
