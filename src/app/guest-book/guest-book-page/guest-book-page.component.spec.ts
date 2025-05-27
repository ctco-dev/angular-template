import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { UsersService } from 'src/app/users/users.service';
import { GuestBookAuthorDialogComponent } from '../guest-book-author-dialog/guest-book-author-dialog.component';
import { GuestBookAuthor, GuestBookEntry } from '../guest-book.model';
import { GuestBookPageActions } from '../state/guest-book.actions';
import {
  selectGuestBookEntries,
  selectGuestBookEntriesLoading,
  selectGuestBookEntrySaving,
} from '../state/guest-book.selectors';
import { GuestBookPageComponent } from './guest-book-page.component';

describe('GuestBookPageComponent', () => {
  let mockUsersService: jasmine.SpyObj<UsersService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let dispatchSpy: jasmine.Spy;

  let store: MockStore;
  let component: GuestBookPageComponent;
  let fixture: ComponentFixture<GuestBookPageComponent>;

  const USER_ENTRIES = [
    {
      id: 1,
      author: {
        name: 'User 1',
        email: 'user1@example.com',
      },
      message: 'Message 1',
    },
    {
      id: 3,
      author: {
        name: 'User 1',
        email: 'user1@example.com',
      },
      message: 'Message 3',
    },
    {
      id: 4,
      author: {
        name: 'User 1',
        email: 'user1@example.com',
      },
      message: 'Message 4',
    },
  ];

  beforeEach(async () => {
    mockUsersService = jasmine.createSpyObj(['getAvatarUrl']);
    mockDialog = jasmine.createSpyObj(['open']);

    TestBed.configureTestingModule({
      imports: [GuestBookPageComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectGuestBookEntries,
              value: [
                {
                  id: 2,
                  author: {
                    name: 'User 2',
                    email: 'user2@example.com',
                  },
                  message: 'Message 2',
                },
                ...USER_ENTRIES,
                {
                  id: 5,
                  author: {
                    name: 'User 2',
                    email: 'user2@example.com',
                  },
                  message: 'Message 5',
                },
              ] as GuestBookEntry[],
            },
            {
              selector: selectGuestBookEntrySaving,
              value: false,
            },
            {
              selector: selectGuestBookEntriesLoading,
              value: false,
            },
          ],
        }),
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: MatDialog,
          useValue: mockDialog,
        },
      ],
    });

    fixture = TestBed.createComponent(GuestBookPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
  });

  it('should dispatch page opened action on init', () => {
    component.ngOnInit();

    expect(dispatchSpy).toHaveBeenCalledOnceWith(
      GuestBookPageActions.pageOpened(),
    );
  });

  it('should dispatch entry saved action on submit', () => {
    const guestBookEntry: GuestBookEntry = {
      author: {
        name: 'Author Name',
        email: 'test@example.com',
      },
      message: 'Test message',
    };

    component.onSubmit(guestBookEntry);

    expect(dispatchSpy).toHaveBeenCalledOnceWith(
      GuestBookPageActions.entrySaved({ entry: guestBookEntry }),
    );
  });

  it('should open dialog with expected data on author click', () => {
    const author: GuestBookAuthor = {
      name: 'User 1',
      email: 'user1@example.com',
    };

    const avatarUrl = 'http://example.com';
    mockUsersService.getAvatarUrl.and.returnValue(of(avatarUrl));

    component.onAuthorClick(author);
    fixture.detectChanges();

    expect(mockDialog.open).toHaveBeenCalledOnceWith(
      GuestBookAuthorDialogComponent,
      {
        data: {
          author,
          avatarUrl,
          entries: USER_ENTRIES,
        },
      },
    );
  });
});
