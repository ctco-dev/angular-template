import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GuestEntry } from '../../../models/guest-entry.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guest-entries',
  templateUrl: './guest-entries.component.html',
  imports: [CommonModule]
})
export class GuestEntriesComponent {
  @Input() entries: GuestEntry[] = [];
  @Output() showAuthorDetails = new EventEmitter<GuestEntry>();

  onViewAuthor(entry: GuestEntry) {
    this.showAuthorDetails.emit(entry);
  }
}