import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { GuestBookEntry } from '../guest-book.model';

@Component({
  selector: 'app-guest-book-list',
  imports: [MatCard, MatIcon, MatIconButton],
  templateUrl: './guest-book-list.component.html',
  styleUrl: './guest-book-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuestBookListComponent {
  entries = input<GuestBookEntry[]>([]);
}
