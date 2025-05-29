import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadEntries } from '../state/guest-book.actions';
import { selectEntries, selectShowPopup, selectSelectedEntry } from '../state/guest-book.selectors';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { GuestFormComponent } from '../guest-form/guest-form.component';
import { GuestEntriesComponent } from '../guest-entries/guest-entries.component';
import { AuthorPopupComponent } from '../author-popup/author-popup.component';

@Component({
  selector: 'app-guest-book',
  templateUrl: './guest-book.component.html',
  standalone: true,
  imports: [CommonModule, MatCardModule, GuestFormComponent, GuestEntriesComponent],
})
export class GuestBookComponent {
  entries$ = this.store.select(selectEntries);
  showPopup$ = this.store.select(selectShowPopup);
  selectedEntry$ = this.store.select(selectSelectedEntry);

  constructor(private store: Store) {
    this.store.dispatch(loadEntries());
  }
}