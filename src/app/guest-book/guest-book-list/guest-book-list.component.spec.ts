import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestBookListComponent } from './guest-book-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { GravatarDirective } from 'src/app/directives/gravatar.directive';
import { DatePipe } from '@angular/common';

describe('GuestBookListComponent', () => {
  let component: GuestBookListComponent;
  let fixture: ComponentFixture<GuestBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestBookListComponent, MatCardModule, MatButtonModule, GravatarDirective, DatePipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
