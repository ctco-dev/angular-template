import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { GuestBookAuthor, GuestBookEntry } from '../guest-book.model';

@Component({
  selector: 'app-guest-book-list',
  imports: [MatCard, MatIcon, MatIconButton],
  templateUrl: './guest-book-list.component.html',
  styleUrl: './guest-book-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuestBookListComponent {
  entries = input<GuestBookEntry[]>([]);
  authorClicked = output<GuestBookAuthor>();

  onClick(author: GuestBookAuthor) {
    this.authorClicked.emit(author);
  }
}
