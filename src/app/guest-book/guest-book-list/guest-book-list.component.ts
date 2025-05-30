import { DatePipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { GuestBookEntry } from '../guest-book-entry.model';
import { GravatarDirective } from 'src/app/directives/gravatar.directive';

@Component({
  selector: 'app-guest-book-list',
  imports: [NgIf, MatCardModule, MatButtonModule, GravatarDirective, DatePipe],
  templateUrl: './guest-book-list.component.html',
  styleUrl: './guest-book-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuestBookListComponent {
  @Input() guestBookEntries: GuestBookEntry[] | null = [];
}
