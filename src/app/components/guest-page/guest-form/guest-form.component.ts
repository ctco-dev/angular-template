import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { addEntry } from '../state/guest-book.actions';
import { GuestEntry } from 'src/app/components/guest-page/models/guest-entry.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guest-form',
  templateUrl: './guest-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class GuestFormComponent {
  guestForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required, Validators.minLength(20)]),
  });

  constructor(private store: Store) {}

  onSubmit() {
    if (this.guestForm.valid) {
      this.store.dispatch(addEntry({ 
        entryData: this.guestForm.value as GuestEntry
      }));
      this.guestForm.reset();
    }
  }
}