import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { GuestBookEntry } from '../guest-book-entry.model';

@Component({
  selector: 'app-guest-book-list',
  imports: [NgIf, MatCardModule, MatButtonModule],
  templateUrl: './guest-book-list.component.html',
  styleUrl: './guest-book-list.component.scss'
})
export class GuestBookListComponent {
  @Input() guestBookEntries: GuestBookEntry[] | null = [];
}
