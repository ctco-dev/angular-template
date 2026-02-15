import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { GuestbookEditComponent } from './guestbook-edit.component';
import { GuestbookEntryForm } from 'src/app/models/guestbook.model';

describe('GuestbookEditComponent', () => {
  let component: GuestbookEditComponent;
  let fixture: ComponentFixture<GuestbookEditComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<GuestbookEditComponent>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        GuestbookEditComponent,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestbookEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit valid form', () => {
    const formData: GuestbookEntryForm = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is a test message This is a test message This is a test message'
    };

    component.guestBookForm.patchValue(formData);
    component.onSubmit();

    expect(mockDialogRef.close).toHaveBeenCalledWith(
      jasmine.objectContaining({
        ...formData,
        createdAt: jasmine.any(Date)
      })
    );
  });
});
