import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestBookEditComponent } from './guest-book-edit.component';

describe('GuestBookEditComponent', () => {
  let component: GuestBookEditComponent;
  let fixture: ComponentFixture<GuestBookEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestBookEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestBookEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
