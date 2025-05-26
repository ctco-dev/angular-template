import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { GuestBookEntry } from '../guest-book.model';

@Component({
  selector: 'app-guest-book-form',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    MatError,
  ],
  templateUrl: './guest-book-form.component.html',
  styleUrl: './guest-book-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuestBookFormComponent {
  formSubmitted = output<GuestBookEntry>();

  private fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    author: this.fb.nonNullable.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    }),
    message: ['', [Validators.required, Validators.minLength(20)]],
  });

  public get name() {
    return this.form.controls.author.controls.name;
  }

  public get email() {
    return this.form.controls.author.controls.email;
  }

  public get message() {
    return this.form.controls.message;
  }

  onSubmit() {
    this.formSubmitted.emit(this.form.getRawValue());
  }
}
