import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { GuestBookEntry } from './guest-book-entry.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestBookService {

  constructor(private localStorageService: LocalStorageService) { }

  getAll(): Observable<GuestBookEntry[]> {
    return of(this.localStorageService
      .getAllItems<GuestBookEntry>())
      .pipe();
  }

  getById(id: number) {
    return of<GuestBookEntry>(this.localStorageService
      .getItem<GuestBookEntry>(`${id}`) as GuestBookEntry)
      .pipe();
  }

  add(guestBookEntry: GuestBookEntry): Observable<GuestBookEntry> {
    let newEntry = {
      ...guestBookEntry,
      id: Date.now().toString(),
    };
    return of(this.localStorageService
      .setItem(newEntry.id, newEntry) as GuestBookEntry)
      .pipe();
  }
}
