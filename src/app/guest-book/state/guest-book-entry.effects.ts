import { Injectable } from "@angular/core";
import { GuestBookAPIActions, GuestBookPageActions } from "./guest-book-entry.actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GuestBookService } from "../guest-book.service";
import { Router } from "@angular/router";
import { catchError, concatMap, exhaustMap, map, of, tap } from "rxjs";

@Injectable()
export class GuestBookEffects {
  ngrxOnInitEffects() {
    return GuestBookPageActions.loadGuestBook();
  }

  loadGuestBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GuestBookPageActions.loadGuestBook),
      exhaustMap(() =>
        this.guestBookService.getAll().pipe(
          map((guestBookEntries) =>
            GuestBookAPIActions.guestBookEntriesLoadedSuccessfully({ guestBookEntries })
          ),
          catchError((error) =>
            of(GuestBookAPIActions.guestBookEntriesLoadedFailed({ message: error }))
          )
        )
      )
    )
  );

  addGuesBookEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GuestBookPageActions.addGuestBookEntry),
      concatMap(({ guestBookEntry }) =>
        this.guestBookService.add(guestBookEntry).pipe(
          map((newGuestBookEntry) =>
            GuestBookAPIActions.guestBookEntryAddedSuccessfully({ guestBookEntry: newGuestBookEntry })
          ),
          catchError((error) =>
            of(GuestBookAPIActions.guestBookEntryAddFailed({ message: error }))
          )
        )
      )
    )
  );

  redirectToGuestBookPage = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          GuestBookAPIActions.guestBookEntryAddedSuccessfully,
        ),
        tap(() => this.router.navigate(['/guest-book']))
      ),
    { dispatch: false } // stop the chain
  );

  constructor(
    private guestBookService: GuestBookService,
    private actions$: Actions,
    private router: Router
  ) {}
}
