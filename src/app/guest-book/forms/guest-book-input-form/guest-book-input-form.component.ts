import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-guest-book-input-form',
  imports: [MatFormFieldModule, MatDividerModule, ReactiveFormsModule, MatInputModule ],
  templateUrl: './guest-book-input-form.component.html',
  styleUrl: './guest-book-input-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuestBookInputFormComponent {
  guestBookForm = new FormGroup({
    message: new FormControl('', [Validators.required, Validators.minLength(20)]),
    author: new FormGroup({
      name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    })
  });

  public get name() {
    return this.guestBookForm.controls.author.controls.name;
  }

  public get username() {
    return this.guestBookForm.controls.author.controls.username;
  }

  public get email() {
    return this.guestBookForm.controls.author.controls.email;
  }

  public get message() {
    return this.guestBookForm.controls.message;
  }
}
