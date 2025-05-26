import { Component } from '@angular/core';
import { IMessage } from './message.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-guest-book',
  imports: [FormsModule],
  templateUrl: './guest-book.component.html',
  styleUrl: './guest-book.component.scss'
})
export class GuestBookComponent {
  newEntry: IMessage;
  messages: IMessage[] = [];

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
      this.newEntry.id = this.messages.length + 1;
      this.newEntry.date = new Date();
      this.messages.push({ ...this.newEntry });
      console.log(this.messages);
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
