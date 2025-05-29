import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { GuestBookPageComponent } from './guest-book-page.component';
import { GuestBookListComponent } from '../guest-book-list/guest-book-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

describe('GuestBookPageComponent', () => {
  let component: GuestBookPageComponent;
  let fixture: ComponentFixture<GuestBookPageComponent>;
  const initialState = {};

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     imports: [GuestBookPageComponent, GuestBookListComponent, MatButtonModule, MatCardModule],
  //     providers: [provideMockStore({initialState})]
  //   })
  //   .compileComponents();

  //   store = TestBed.inject(MockStore);
  //   fixture = TestBed.createComponent(GuestBookPageComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
