import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectEntries } from '../state/guest-book.selectors';
import { showAuthorDetails } from '../state/guest-book.actions';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { GuestEntry } from 'src/app/features/guest-page/models/guest-entry.model';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {
  MatDialog
} from '@angular/material/dialog';
import { AuthorPopupComponent } from '../author-popup/author-popup.component';

@Component({
  selector: 'app-guest-entries',
  templateUrl: './guest-entries.component.html',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule],
})
export class GuestEntriesComponent {
  entries$ = this.store.select(selectEntries);

  readonly dialog = inject(MatDialog);

  constructor(private store: Store) { }

  onViewAuthor(entry: GuestEntry) {
    const dialogRef = this.dialog.open(AuthorPopupComponent);
    this.store.dispatch(showAuthorDetails({ entry }));
  }
}