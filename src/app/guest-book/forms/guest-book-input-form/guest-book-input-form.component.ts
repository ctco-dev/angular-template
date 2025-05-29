import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output, output } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GuestBookEntry } from '../../guest-book-entry.model';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-guest-book-input-form',
  imports: [MatFormFieldModule, MatDividerModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './guest-book-input-form.component.html',
  styleUrl: './guest-book-input-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuestBookInputFormComponent implements OnInit, OnDestroy {
  private doSubmitSubscription?: Subscription;
  @Output() added = new EventEmitter<GuestBookEntry>();
  @Input() doSubmit$: Observable<void> = of<void>();

  ngOnDestroy(): void {
    if(this.doSubmitSubscription){
      this.doSubmitSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.doSubmitSubscription = this.doSubmit$.subscribe(this.onSubmit.bind(this));
  }

  guestBookForm = new FormGroup({
    message: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(500)]),
    author: new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(150)]),
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

  onSubmit() {
    this.guestBookForm.markAllAsTouched();

    if (this.guestBookForm.invalid) {
      return;
    }

    const entry: GuestBookEntry = {
      id: '',
      message: this.guestBookForm.value.message ?? '',
      author: {
        name: this.guestBookForm.value.author?.name ?? '',
        username: this.guestBookForm.value.author?.username ?? '',
        email: this.guestBookForm.value.author?.email ?? '',
      }
    };

    this.added.emit(entry);
    this.guestBookForm.reset();
  }
}
