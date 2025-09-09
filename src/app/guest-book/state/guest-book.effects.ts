import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, filter, map, of, switchMap } from 'rxjs';
import { GuestBookService } from '../guest-book.service';
import {
  GuestBookApiActions,
  GuestBookPageActions,
} from './guest-book.actions';
import { selectGuestBookEntriesLoaded } from './guest-book.selectors';

@Injectable()
export class GuestBookEffects {
  loadEntries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GuestBookPageActions.pageOpened),
      concatLatestFrom(() => this.store.select(selectGuestBookEntriesLoaded)),
      filter(([, loaded]) => !loaded),
      exhaustMap(() =>
        this.guestBookService.getEntries().pipe(
          map((entries) =>
            GuestBookApiActions.entriesLoadedSuccess({ entries }),
          ),
          catchError((error) =>
            of(GuestBookApiActions.entriesLoadedFail({ message: error })),
          ),
        ),
      ),
    );
  });

  saveEntry$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GuestBookPageActions.entrySaved),
      switchMap(({ entry }) =>
        this.guestBookService.save(entry).pipe(
          map((savedEntry) =>
            GuestBookApiActions.entrySavedSuccess({ entry: savedEntry }),
          ),
          catchError((error) =>
            of(GuestBookApiActions.entrySavedFail({ message: error })),
          ),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store,
    private guestBookService: GuestBookService,
  ) {}
}
