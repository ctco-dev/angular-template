import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GuestEntry } from 'src/app/models/guest-entry.model';

@Component({
  selector: 'app-guest-form',
  templateUrl: './guest-form.component.html',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
})

export class GuestFormComponent {
  @Output() newEntry = new EventEmitter<GuestEntry>();

  guestForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(20)]),
  });

  onSubmit() {
    if (this.guestForm.valid) {
      localStorage.setItem(new Date().toString(), JSON.stringify(this.guestForm.value));
      this.newEntry.emit(this.guestForm.value as GuestEntry);
      this.guestForm.setValue({name: "", email: "", message: ""});
    }
  }
}