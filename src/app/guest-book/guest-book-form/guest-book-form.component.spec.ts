import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestBookEntry } from '../guest-book.model';
import { GuestBookFormComponent } from './guest-book-form.component';

describe('GuestBookFormComponent', () => {
  let component: GuestBookFormComponent;
  let fixture: ComponentFixture<GuestBookFormComponent>;

  let DEFAULT_ENTRY: GuestBookEntry;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [GuestBookFormComponent],
    });

    fixture = TestBed.createComponent(GuestBookFormComponent);
    component = fixture.componentInstance;

    DEFAULT_ENTRY = {
      author: {
        name: 'Author Name',
        email: 'test@example.com',
      },
      message: 'a'.repeat(20),
    };
  });

  describe('onSubmit', () => {
    it('should not emit when form is invalid', () => {
      spyOn(component.formSubmitted, 'emit');

      component.onSubmit();

      expect(component.formSubmitted.emit).not.toHaveBeenCalled();
    });

    it('should emit the formSubmitted output with the expected entry', () => {
      component.form.setValue(DEFAULT_ENTRY);
      spyOn(component.formSubmitted, 'emit');

      component.onSubmit();

      expect(component.formSubmitted.emit).toHaveBeenCalledWith(DEFAULT_ENTRY);
    });

    it('should reset form value and errors', () => {
      component.form.setValue(DEFAULT_ENTRY);
      spyOn(component.formSubmitted, 'emit');

      component.onSubmit();

      expect(component.form.getRawValue()).toEqual({
        author: {
          name: '',
          email: '',
        },
        message: '',
      });
      expect(component.name.errors).toBeNull();
      expect(component.email.errors).toBeNull();
      expect(component.message.errors).toBeNull();
    });
  });

  describe('validation', () => {
    it('should validate required fields', () => {
      const requiredError = { required: true };
      expect(component.name.errors).toEqual(requiredError);
      expect(component.email.errors).toEqual(requiredError);
      expect(component.message.errors).toEqual(requiredError);
    });

    it('should validate email', () => {
      component.email.setValue('Invalid Email Format');
      expect(component.email.errors).toEqual({ email: true });
    });

    it('should validate message to be at least 20 characters', () => {
      component.message.setValue('a'.repeat(19));
      expect(component.message.errors).toEqual({
        minlength: { requiredLength: 20, actualLength: 19 },
      });
    });
  });
});
