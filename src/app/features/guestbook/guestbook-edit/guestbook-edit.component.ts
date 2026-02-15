import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-guestbook-edit',
  imports: [
    NgIf,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './guestbook-edit.component.html',
  styleUrl: './guestbook-edit.component.scss'
})
export class GuestbookEditComponent {
  guestBookForm: FormGroup;

  constructor(
    private guestPostEntryForm: FormBuilder,
    private guestBookEntryDialogRef: MatDialogRef<GuestbookEditComponent>,
  ) {
    this.guestBookForm = this.guestPostEntryForm.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  onSubmit(): void {
    if (this.guestBookForm.valid) {
      const entry = {
        ...this.guestBookForm.value,
        createdAt: new Date()
      };
      this.guestBookEntryDialogRef.close(entry);
    }
  }

  onCancel(): void {
    this.guestBookEntryDialogRef.close();
  }
}
