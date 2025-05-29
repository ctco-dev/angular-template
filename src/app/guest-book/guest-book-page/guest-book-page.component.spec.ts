import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { GuestBookPageComponent } from './guest-book-page.component';
import { GuestBookListComponent } from '../guest-book-list/guest-book-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import {
  selectGuestBookEntries,
  selectGuestBookErrorMessage,
  selectGuestBookLoading,
} from '../state/guest-book-entry.selectors';

describe('GuestBookPageComponent', () => {
  let component: GuestBookPageComponent;
  let fixture: ComponentFixture<GuestBookPageComponent>;
  let mockGuestBookStore: MockStore; //jasmine.createSpyObj('Store', []);
  let guestBookEntryCollectionsSelector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        GuestBookPageComponent,
        GuestBookListComponent,
        MatButtonModule,
        MatCardModule,
        HttpClientTestingModule,
      ],
      providers: [provideMockStore()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    //TestBed.overrideProvider(Store, {useValue: mockGuestBookStore})

    mockGuestBookStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(GuestBookPageComponent);
    component = fixture.componentInstance;

    guestBookEntryCollectionsSelector = mockGuestBookStore.overrideSelector(
      selectGuestBookEntries,
      [
        {
          author: {
            email: '',
            name: '',
            username: '',
          },
          id: '1',
          message: 'message',
        },
      ],
    );

    mockGuestBookStore.overrideSelector(selectGuestBookLoading, false);
    mockGuestBookStore.overrideSelector(selectGuestBookErrorMessage, '');

    fixture.detectChanges();
    //spyOn(mockGuestBookStore, 'dispatch').and.callFake(() => {});
  });

  it('should render guest book entries', () => {
    expect(fixture.debugElement.queryAll(By.css('.container')).length).toBe(1);
  });
});
