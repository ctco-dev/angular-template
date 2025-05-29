import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { GuestBookEntry } from '../guest-book.model';

export const GuestBookPageActions = createActionGroup({
  source: 'Guest Book Page',
  events: {
    'Page Opened': emptyProps(),
    'Entry Saved': props<{ entry: GuestBookEntry }>(),
  },
});

export const GuestBookApiActions = createActionGroup({
  source: 'Guest Book API',
  events: {
    'Entries Loaded Success': props<{ entries: GuestBookEntry[] }>(),
    'Entries Loaded Fail': props<{ message: string }>(),
    'Entry Saved Success': props<{ entry: GuestBookEntry }>(),
    'Entry Saved Fail': props<{ message: string }>(),
  },
});
