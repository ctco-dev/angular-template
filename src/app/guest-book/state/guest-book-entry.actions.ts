import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { GuestBookEntry } from '../guest-book-entry.model';

export const GuestBookPageActions = createActionGroup({
  source: 'GuestBook Page',
  events: {
    'Load GuestBook': emptyProps(),
    'Load GuestBook Entry': emptyProps(),
    'Add GuestBook Entry': props<{guestBookEntry: GuestBookEntry}>(),
  },
});

export const GuestBookAPIActions = createActionGroup({
  source: 'GuestBook API',
  events: {
    'Load GuestBookEntries': emptyProps(),
    'GuestBookEntries Loaded Successfully': props<{ guestBookEntries: GuestBookEntry[] }>(),
    'GuestBookEntries Loaded Failed': props<{ message: string }>(),
    'GuestBookEntry Added Successfully': props<{ guestBookEntry: GuestBookEntry }>(), // unused
    'GuestBookEntry Add Failed': props<{ message: string }>(), // unused
  },
});
