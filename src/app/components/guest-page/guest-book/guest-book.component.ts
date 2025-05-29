import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadEntries } from '../state/guest-book.actions';
import { selectEntries, selectSelectedEntry } from '../state/guest-book.selectors';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { GuestFormComponent } from '../guest-form/guest-form.component';
import { GuestEntriesComponent } from '../guest-entries/guest-entries.component';

@Component({
  selector: 'app-guest-book',
  templateUrl: './guest-book.component.html',
  standalone: true,
  imports: [CommonModule, MatCardModule, GuestFormComponent, GuestEntriesComponent],
})
export class GuestBookComponent {
  entries$ = this.store.select(selectEntries);
  selectedEntry$ = this.store.select(selectSelectedEntry);

  constructor(private store: Store) {
    this.store.dispatch(loadEntries());
  }
}