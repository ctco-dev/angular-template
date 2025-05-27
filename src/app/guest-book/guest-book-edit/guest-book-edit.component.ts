import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { GuestBookInputFormComponent } from '../forms/guest-book-input-form/guest-book-input-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { GuestBookEntry } from '../guest-book-entry.model';
import { GuestBookPageActions } from '../state/guest-book-entry.actions';

@Component({
  selector: 'app-guest-book-edit',
  imports: [GuestBookInputFormComponent, MatDialogModule, MatButtonModule],
  templateUrl: './guest-book-edit.component.html',
  styleUrl: './guest-book-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuestBookEditComponent {
  @Output() add = new EventEmitter<GuestBookEntry>();

  constructor(private store: Store){
  }

  addNew() {
    console.log('Add new');
    this.store.dispatch(GuestBookPageActions.addGuestBookEntry({ guestBookEntry:
      { id: '', author: { name: 'name', username: 'username', email: 'email' }, message: 'Test new message to be added ' + Date.now().toString() }}))
  }
}
