import { Component } from '@angular/core';
import { IMessage } from './message.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentsService } from './comments.service';
import { startWith, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-guest-book',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './guest-book.component.html',
  styleUrl: './guest-book.component.scss'
})
export class GuestBookComponent {
  newEntry: IMessage;
  private refreshGustMessages$ = new Subject<void>();
  guestMessages$ = this.refreshGustMessages$.pipe(
    startWith(null), // so it loads initially
    switchMap(() => this.service.guestMessages$) // <-- call a method that returns Observable<IMessage[]>
  );

  constructor(private service: CommentsService) {
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
      this.newEntry.date = new Date();
      this.service.postMessage(this.newEntry).subscribe(entry => {
        // Optionally, you can handle the response here 
        console.log('Entry added:', entry);
        // Refresh the guest messages list
        this.refreshGustMessages$.next();
      });
      // Reset the form
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
