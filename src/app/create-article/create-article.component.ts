import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpArticleService } from '../services/http-article-service';
import { Article } from '../models/article';

@Component({
  selector: 'app-create-article',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './create-article.component.html'
})
export class CreateArticleComponent {

  private fb = inject(FormBuilder);
  private articleService = inject(HttpArticleService);

  today = new Date();

  private futureDateValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const value = control.value as Date | null;
    if (!value) return null;

    const selected = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return selected >= today ? null : { pastDate: true };
  };

  form = this.fb.nonNullable.group({
    title: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)]
    ],
    description: [
      '',
      [Validators.required, Validators.minLength(10)]
    ],
    publishDate: [
      null as Date | null,
      [Validators.required, this.futureDateValidator]
    ]
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();

if (!raw.publishDate) {
  return;
}

  this.articleService.addArticle({
  title: raw.title,
  description: raw.description,
  picture: 'assets/default1.jpg',
  publishDate: raw.publishDate
});

    this.form.reset();
  }
}