import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GuestBookFormComponent } from '../guest-book-form/guest-book-form.component';
import { GuestBookListComponent } from '../guest-book-list/guest-book-list.component';
import { GuestBookEntry } from '../guest-book.model';
import { GuestBookPageActions } from '../state/guest-book.actions';
import {
  selectGuestBookEntries,
  selectGuestBookEntriesLoading,
  selectGuestBookEntrySaving,
} from '../state/guest-book.selectors';

@Component({
  selector: 'app-guest-book-page',
  imports: [GuestBookFormComponent, GuestBookListComponent],
  templateUrl: './guest-book-page.component.html',
  styleUrl: './guest-book-page.component.scss',
})
export class GuestBookPageComponent implements OnInit {
  private store = inject(Store);
  entries = this.store.selectSignal(selectGuestBookEntries);
  loading = this.store.selectSignal(selectGuestBookEntriesLoading);
  saving = this.store.selectSignal(selectGuestBookEntrySaving);

  ngOnInit(): void {
    this.store.dispatch(GuestBookPageActions.pageOpened());
  }

  onSubmit(guestBookEntry: GuestBookEntry) {
    this.store.dispatch(
      GuestBookPageActions.entrySaved({ entry: guestBookEntry }),
    );
  }
}
