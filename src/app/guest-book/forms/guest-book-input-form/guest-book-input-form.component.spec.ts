import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestBookInputFormComponent } from './guest-book-input-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('GuestBookInputFormComponent', () => {
  let component: GuestBookInputFormComponent;
  let fixture: ComponentFixture<GuestBookInputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestBookInputFormComponent, MatFormFieldModule, MatDividerModule, ReactiveFormsModule, MatInputModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestBookInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
