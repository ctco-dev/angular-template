import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GuestbookAPIActions, GuestbookPageActions } from "./guestbook.actions";
import { catchError, concatMap, map, of } from 'rxjs';
import { GuestbookService } from "src/app/features/guestbook/services/guestbook.service";


@Injectable()
export class GuestbookEffects {

    ngrxOnInitEffects() {
        return GuestbookPageActions.loadGuestbookEntries();
    }

    constructor(
        private guestbookService: GuestbookService,
        private actions$: Actions
    ) { }

    loadGuestbookEntries$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GuestbookPageActions.loadGuestbookEntries),
            concatMap(() =>
                this.guestbookService.loadEntries().pipe(
                    map(entries => GuestbookAPIActions.guestbookEntriesLoadedSuccess({ entries })),
                    catchError(message => of(GuestbookAPIActions.guestbookEntriesLoadedFail({ message })))
                )
            )
        )
    );

    addGuestbookEntry$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GuestbookPageActions.addGuestbookEntry),
            concatMap(({ entry }) =>
                this.guestbookService.add(entry).pipe(
                    map((newEntry) => GuestbookAPIActions.guestbookEntryAddedSuccess({ entry: newEntry })),
                    catchError((error) => of(GuestbookAPIActions.guestbookEntryAddedFail({ message: error })))
                )
            )
        )
    );
}