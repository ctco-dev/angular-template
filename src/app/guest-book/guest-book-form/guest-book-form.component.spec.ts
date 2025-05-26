import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestBookFormComponent } from './guest-book-form.component';

describe('GuestBookFormComponent', () => {
  let component: GuestBookFormComponent;
  let fixture: ComponentFixture<GuestBookFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestBookFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestBookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
