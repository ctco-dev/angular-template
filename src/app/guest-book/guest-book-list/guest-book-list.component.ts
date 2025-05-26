import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatList, MatListItem } from '@angular/material/list';
import { GuestBookEntry } from '../guest-book.model';

@Component({
  selector: 'app-guest-book-list',
  imports: [MatList, MatListItem, MatCard],
  templateUrl: './guest-book-list.component.html',
  styleUrl: './guest-book-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuestBookListComponent {
  entries = input<GuestBookEntry[]>([]);
}
