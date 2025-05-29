import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { GuestbookListComponent } from '../guestbook-list/guestbook-list.component';
import { selectGuestbookEntries, selectGuestbookLoading, selectGuestbookErrorMessage } from 'src/app/store/guestbook/guestbook.selector';
import { GuestbookPageActions } from 'src/app/store/guestbook/guestbook.actions';
import { MatCardModule } from '@angular/material/card';
import { GuestbookDialogService } from '../services/guestbook-dialog.service';

@Component({
  selector: 'app-guestbook-page',
  imports: [NgIf, MatCardModule, MatButtonModule, GuestbookListComponent],
  templateUrl: './guestbook-page.component.html',
  styleUrl: './guestbook-page.component.scss'
})
export class GuestbookPageComponent {
  guestPosts = this.store.selectSignal(selectGuestbookEntries);
  loading = this.store.selectSignal(selectGuestbookLoading);
  errorMessage = this.store.selectSignal(selectGuestbookErrorMessage);

  constructor(
    private store: Store,
    private guestbookDialogService: GuestbookDialogService
  ) { }

  openGuestBookDialog(): void {
    this.guestbookDialogService.openGuestBookDialog().subscribe((result) => {
      if (result) {
        const entry = this.guestbookDialogService.createGuestbookEntry(result);
        this.store.dispatch(GuestbookPageActions.addGuestbookEntry({ entry }));
      }
    });
  }
}
