import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { GuestbookEntry } from "src/app/models/guestbook.model";

export const GuestbookPageActions = createActionGroup({
    source: 'Guestbook Page',
    events: {
        'Load Guestbook Entries': emptyProps(),
        'Add Guestbook Entry': props<{ entry: GuestbookEntry }>(),
    },
});

export const GuestbookAPIActions = createActionGroup({
    source: 'Guestbook API',
    events: {
        'Load Guestbook Entries': emptyProps(),
        'Guestbook Entries Loaded Success': props<{ entries: GuestbookEntry[] }>(),
        'Guestbook Entries Loaded Fail': props<{ message: string }>(),
        'Guestbook Entry Added Success': props<{ entry: GuestbookEntry }>(),
        'Guestbook Entry Added Fail': props<{ message: string }>(),
    },
});