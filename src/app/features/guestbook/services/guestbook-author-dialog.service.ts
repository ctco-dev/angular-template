import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GuestbookAuthorComponent } from '../guestbook-author/guestbook-author.component';
import { Author } from 'src/app/models/author.model';

@Injectable({
  providedIn: 'root'
})
export class GuestbookAuthorDialogService {

  constructor(private dialog: MatDialog) { }

  openAuthorDialog(author: Author): void {
    this.dialog.open(GuestbookAuthorComponent, {
      data: author
    });
  }
}
