import { Component, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Author } from 'src/app/models/author.model';

@Component({
  selector: 'app-guestbook-author',
  imports: [MatDialogModule],
  templateUrl: './guestbook-author.component.html',
  styleUrl: './guestbook-author.component.scss'
})
export class GuestbookAuthorComponent {
  readonly authorName = signal('')
  readonly email = signal('')

  constructor(@Inject(MAT_DIALOG_DATA) public data: Author) {
    if (data) {
      this.authorName.set(data.name || '');
      this.email.set(data.email || '');
    }
  }

}
