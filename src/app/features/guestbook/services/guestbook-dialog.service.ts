import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { GuestbookEditComponent } from '../guestbook-edit/guestbook-edit.component';
import { GuestbookEntry, GuestbookEntryForm } from 'src/app/models/guestbook.model';

@Injectable({
  providedIn: 'root'
})
export class GuestbookDialogService {

  constructor(private dialog: MatDialog) { }

  openGuestBookDialog(): Observable<GuestbookEntryForm> {
    const guestBookDialogRef = this.dialog.open(GuestbookEditComponent, {
      width: '500px',
      disableClose: true
    });

    return guestBookDialogRef.afterClosed();
  }

  createGuestbookEntry(formResult: GuestbookEntryForm): GuestbookEntry {
    return {
      id: Math.floor(Math.random() * 1000),
      author: {
        name: formResult.name,
        email: formResult.email
      },
      message: formResult.message,
      createdAt: new Date()
    };
  }
}
