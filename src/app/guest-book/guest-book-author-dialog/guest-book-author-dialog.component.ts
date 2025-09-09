import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { GuestBookAuthor, GuestBookEntry } from '../guest-book.model';

export interface GuestBookAuthorDialogData {
  author: GuestBookAuthor;
  avatarUrl: string;
  entries: GuestBookEntry[];
}

@Component({
  selector: 'app-guest-book-author-dialog',
  imports: [MatDialogModule, MatButtonModule, MatDialogTitle],
  templateUrl: './guest-book-author-dialog.component.html',
  styleUrl: './guest-book-author-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuestBookAuthorDialogComponent {
  readonly data = inject<GuestBookAuthorDialogData>(MAT_DIALOG_DATA);
}
