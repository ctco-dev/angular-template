import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { GuestBookListComponent } from '../guest-book-list/guest-book-list.component';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { GuestBookPageActions } from '../state/guest-book-entry.actions';
import { selectGuestBookEntries, selectGuestBookErrorMessage, selectGuestBookLoading } from '../state/guest-book-entry.selectors';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { GuestBookEditComponent } from '../guest-book-edit/guest-book-edit.component';

@Component({
  selector: 'app-guest-book-page',
  imports: [NgIf, GuestBookListComponent, MatButtonModule, MatCardModule],
  templateUrl: './guest-book-page.component.html',
  styleUrl: './guest-book-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuestBookPageComponent implements OnInit {
  guestBookEntries = this.store.selectSignal(selectGuestBookEntries);
  loading = this.store.selectSignal(selectGuestBookLoading);
  errorMessage = this.store.selectSignal(selectGuestBookErrorMessage);
  readonly dialog = inject(MatDialog);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(GuestBookPageActions.loadGuestBook());
  }

  addNewDialog() {
    const dialogRef = this.dialog.open(GuestBookEditComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
