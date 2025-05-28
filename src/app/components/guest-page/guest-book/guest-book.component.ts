import { Component, OnInit } from '@angular/core';
import { GuestEntry } from '../../../models/guest-entry.model';
import { GuestFormComponent } from "../guest-form/guest-form.component";
import { GuestEntriesComponent } from "../guest-entries/guest-entries.component";
import { AuthorPopupComponent } from '../author-popup/author-popup.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guest-book',
  templateUrl: './guest-book.component.html',
  imports: [GuestFormComponent, GuestEntriesComponent, AuthorPopupComponent, CommonModule]
})
export class GuestBookComponent implements OnInit {
  entries: GuestEntry[] = [];
  public showPopup = false;
  selectedEntry!: GuestEntry | null;

  ngOnInit(): void {
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && localStorage.getItem(key)) {
          this.entries.push(JSON.parse(localStorage.getItem(key) as string) as GuestEntry);
        }
      }
    }
  }

  handleNewEntry(entryData: Omit<GuestEntry, 'id' | 'createdAt'>) {
    const newEntry: GuestEntry = {
      ...entryData,
      id: crypto.randomUUID(),
      createdAt: new Date()
    };

    this.entries.unshift(newEntry);
  }

  handleShowAuthorDetails(entry: GuestEntry) {
    this.selectedEntry = entry;
    this.showPopup = true;
  }

  handleClosePopup() {
    this.showPopup = false;
    this.selectedEntry = null;
  }
}