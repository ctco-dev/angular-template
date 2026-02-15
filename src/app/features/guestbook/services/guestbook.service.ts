import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GuestbookEntry } from 'src/app/models/guestbook.model';

@Injectable({
  providedIn: 'root'
})
export class GuestbookService {
  private entries: GuestbookEntry[] = [
    {
      id: 876,
      author: {
        name: 'John Doe',
        email: 'john@example.com'
      },
      message: 'This is a test message. This is a test message. This is a test message. This is a test message.',
      createdAt: new Date()
    },
    {
      id: 343,
      author: {
        name: 'Jane Smith',
        email: 'jane@example.com'
      },
      message: 'This is a test message. This is a test message. This is a test message. This is a test message.',
      createdAt: new Date()
    }
  ];

  loadEntries(): Observable<GuestbookEntry[]> {
    return of(this.entries);
  }

  add(entry: GuestbookEntry): Observable<GuestbookEntry> {
    this.entries = [...this.entries, entry];
    return of(entry);
  }

}
