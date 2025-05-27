import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestBookInputFormComponent } from './guest-book-input-form.component';

describe('GuestBookInputFormComponent', () => {
  let component: GuestBookInputFormComponent;
  let fixture: ComponentFixture<GuestBookInputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestBookInputFormComponent]
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
