import { Component } from '@angular/core';
import { GuestBookFormComponent } from '../guest-book-form/guest-book-form.component';
import { GuestBookEntry } from '../guest-book.model';

@Component({
  selector: 'app-guest-book-page',
  imports: [GuestBookFormComponent],
  templateUrl: './guest-book-page.component.html',
  styleUrl: './guest-book-page.component.scss',
})
export class GuestBookPageComponent {
  onSubmit(guestBookEntry: GuestBookEntry) {
    console.log(guestBookEntry);
  }
}
