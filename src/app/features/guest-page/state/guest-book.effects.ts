import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as GuestBookActions from './guest-book.actions';
import { GuestEntry } from 'src/app/features/guest-page/models/guest-entry.model';

@Injectable()
export class GuestBookEffects {
  loadEntries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GuestBookActions.loadEntries),
      mergeMap(() => {
        const entries = this.getEntriesFromLocalStorage();
        return of(GuestBookActions.loadEntriesSuccess({ entries }));
      })
    )
  );

  addEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GuestBookActions.addEntry),
      map(({ entryData }) => {
        const entry: GuestEntry = {
          ...entryData,
        };
        localStorage.setItem(entry.name as string, JSON.stringify(entry));
        return GuestBookActions.addEntrySuccess({ entry });
      })
    )
  );

  private getEntriesFromLocalStorage(): GuestEntry[] {
    const entries: GuestEntry[] = [];
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && localStorage.getItem(key)) {
          entries.push(JSON.parse(localStorage.getItem(key) as string) as GuestEntry);
        }
      }
    }
    return entries;
  }

  constructor(private actions$: Actions) {}
}