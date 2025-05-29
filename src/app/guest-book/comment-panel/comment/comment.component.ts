import { Component, signal } from '@angular/core';
import { IMessage } from './message.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentsService } from './comments.service';
import { startWith, Subject, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-comment',
  imports: [FormsModule, CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {

  newEntry: IMessage;
  selectedEntry: IMessage | null = null;
  private refreshGustMessages$ = new Subject<void>();

  // Convert observable to signal
  readonly guestMessagesSignal = toSignal(
    this.refreshGustMessages$.pipe(
      startWith(null),
      switchMap(() => this.service.guestMessages$)
    ),
    { initialValue: [] as IMessage[] }
  );

  constructor(private service: CommentsService) {
    this.newEntry = {
      id: 0,
      name: '',
      message: '',
      email: '',
      avatar: 'user-m.png',
      gender: 'male',
      date: new Date()
    };
  }

  addEntry(form: NgForm) {
    if (this.newEntry.name && this.newEntry.message && this.newEntry.email) {
      this.newEntry.date = new Date();
      this.service.postMessage(this.newEntry).subscribe(entry => {
        this.refreshGustMessages$.next();
      });
      this.newEntry = {
        id: 0,
        name: '',
        message: '',
        email: '',
        avatar: 'user-m.png',
        gender: 'male',
        date: new Date()
      };
      form.resetForm();
    }
  }
}
