import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectEntries } from '../state/guest-book.selectors';
import { showAuthorDetails } from '../state/guest-book.actions';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { GuestEntry } from 'src/app/components/guest-page/models/guest-entry.model';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guest-entries',
  templateUrl: './guest-entries.component.html',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule],
})
export class GuestEntriesComponent {
  entries$ = this.store.select(selectEntries);

  constructor(private store: Store) {}

  onViewAuthor(entry: GuestEntry) {
    this.store.dispatch(showAuthorDetails({ entry }));
  }
}