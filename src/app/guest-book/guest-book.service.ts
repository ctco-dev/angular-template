import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { GuestBookEntry } from './guest-book-entry.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestBookService {
  private readonly typePrefix = 'guestBook'
  constructor(private localStorageService: LocalStorageService) { }

  getAll(): Observable<GuestBookEntry[]> {
    return of(this.localStorageService
      .getAllItems<GuestBookEntry>(this.typePrefix))
      .pipe();
  }

  getById(id: number) {
    return of<GuestBookEntry>(this.localStorageService
      .getItem<GuestBookEntry>(this.typePrefix, `${id}`) as GuestBookEntry)
      .pipe();
  }

  add(guestBookEntry: GuestBookEntry): Observable<GuestBookEntry> {
    let newEntry = {
      ...guestBookEntry,
      id: Date.now().toString(),
      creationDate: new Date(),
    };
    return of(this.localStorageService
      .setItem(this.typePrefix, newEntry.id, newEntry) as GuestBookEntry)
      .pipe();
  }
}
