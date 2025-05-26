import { Component } from '@angular/core';
import { IMessage } from './message.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guest-book',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './guest-book.component.html',
  styleUrl: './guest-book.component.scss'
})
export class GuestBookComponent {
  newEntry: IMessage;
  guestMessages: IMessage[] = [];

  constructor() {
    this.newEntry = {
      id: 0,
      name: '',
      message: '',
      email: '',
      date: new Date()
    };
  }

  addEntry() {
    if (this.newEntry.name && this.newEntry.message && this.newEntry.email) {
      this.newEntry.id = this.guestMessages.length + 1;
      this.newEntry.date = new Date();
      this.guestMessages.push({ ...this.newEntry });
      console.log(this.guestMessages);
      this.newEntry = {
        id: 0,
        name: '',
        message: '',
        email: '',
        date: new Date()
      };
    }
  }

}
