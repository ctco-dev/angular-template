import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { GuestBookInputFormComponent } from '../forms/guest-book-input-form/guest-book-input-form.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { GuestBookEntry } from '../guest-book-entry.model';
import { GuestBookPageActions } from '../state/guest-book-entry.actions';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-guest-book-edit',
  imports: [GuestBookInputFormComponent, MatDialogModule, MatButtonModule],
  templateUrl: './guest-book-edit.component.html',
  styleUrl: './guest-book-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuestBookEditComponent {
  readonly dialogRef = inject(MatDialogRef<GuestBookEditComponent>);
  doSubmit$ = new Subject<void>();

  constructor(private store: Store) {
  }

  save() {
    this.doSubmit$.next();
  }

  onNewAdded(guestBookEntry: GuestBookEntry) {
    this.store.dispatch(GuestBookPageActions.addGuestBookEntry({ guestBookEntry }));
    this.dialogRef.close(true);
  }
}
