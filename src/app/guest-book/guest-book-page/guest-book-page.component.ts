import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { UsersService } from 'src/app/users/users.service';
import {
  GuestBookAuthorDialogComponent,
  GuestBookAuthorDialogData,
} from '../guest-book-author-dialog/guest-book-author-dialog.component';
import { GuestBookFormComponent } from '../guest-book-form/guest-book-form.component';
import { GuestBookListComponent } from '../guest-book-list/guest-book-list.component';
import { GuestBookAuthor, GuestBookEntry } from '../guest-book.model';
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
  private usersService = inject(UsersService);
  private dialog = inject(MatDialog);

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

  onAuthorClick(guestBookAuthor: GuestBookAuthor) {
    this.usersService.getAvatarUrl(guestBookAuthor.email).subscribe((url) => {
      this.dialog.open(GuestBookAuthorDialogComponent, {
        data: {
          author: guestBookAuthor,
          avatarUrl: url,
          entries: this.entries().filter(
            (x) => x.author.email == guestBookAuthor.email,
          ),
        } as GuestBookAuthorDialogData,
      });
    });
  }
}
