import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestbookPageComponent } from './guestbook-page.component';
import { provideMockStore } from '@ngrx/store/testing';
import { selectGuestbookEntries } from 'src/app/store/guestbook/guestbook.selector';

describe('GuestbookPageComponent', () => {
  let component: GuestbookPageComponent;
  let fixture: ComponentFixture<GuestbookPageComponent>;

  const mockGuestbookEntries = [
    { id: 1, author: {name: 'Test Guest 1'}, message: 'Test Message 1' },
    { id: 2, author: {name: 'Test Guest 2'}, message: 'Test Message 2' }
  ];

  const initialState = {
    guestbook: {
      loading: false,
      errorMessage: '',
      ids: [1, 2],
      entities: {
        1: mockGuestbookEntries[0],
        2: mockGuestbookEntries[1]
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestbookPageComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            { selector: selectGuestbookEntries, value: mockGuestbookEntries }
          ]
        })
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GuestbookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
