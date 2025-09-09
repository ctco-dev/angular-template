import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { GuestBookEntry } from '../guest-book.model';
import { GuestBookService } from '../guest-book.service';
import {
  GuestBookApiActions,
  GuestBookPageActions,
} from './guest-book.actions';
import { GuestBookEffects } from './guest-book.effects';
import { selectGuestBookEntriesLoaded } from './guest-book.selectors';

describe('GuestBookEffects', () => {
  let actions$ = new Observable<Action>();
  let store: MockStore;
  let mockGuestBookService: jasmine.SpyObj<GuestBookService>;
  let testScheduler: TestScheduler;
  let effects: GuestBookEffects;

  beforeEach(() => {
    mockGuestBookService = jasmine.createSpyObj(['getEntries', 'save']);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        provideMockStore({
          selectors: [
            {
              selector: selectGuestBookEntriesLoaded,
              value: false,
            },
          ],
        }),
        GuestBookEffects,
        {
          provide: GuestBookService,
          useValue: mockGuestBookService,
        },
      ],
    });

    actions$ = TestBed.inject(Actions);
    effects = TestBed.inject(GuestBookEffects);
    store = TestBed.inject(MockStore);
  });

  describe('loadEntries$', () => {
    it('should return loaded success on pageOpened', () => {
      const entries: GuestBookEntry[] = [
        {
          id: 1,
          author: {
            name: 'Author 1',
            email: 'author1@example.com',
          },
          message: 'Message 1',
        },
        {
          id: 2,
          author: {
            name: 'Author 2',
            email: 'author2@example.com',
          },
          message: 'Message 2',
        },
      ];

      testScheduler.run(({ cold, hot, expectObservable }) => {
        actions$ = hot('-a', {
          a: GuestBookPageActions.pageOpened(),
        });
        mockGuestBookService.getEntries.and.returnValue(
          cold('--b|', { b: entries }),
        );

        expectObservable(effects.loadEntries$).toBe('---c', {
          c: GuestBookApiActions.entriesLoadedSuccess({ entries }),
        });
      });
    });

    it('should return loaded fail when service fails', () => {
      const error = 'test error';
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: GuestBookPageActions.pageOpened() });
        mockGuestBookService.getEntries.and.returnValue(
          cold('--#', undefined, error),
        );

        expectObservable(effects.loadEntries$).toBe('---c', {
          c: GuestBookApiActions.entriesLoadedFail({
            message: error,
          }),
        });
      });
    });

    it('should not load entries when they were already loaded', () => {
      store.overrideSelector(selectGuestBookEntriesLoaded, true);
      testScheduler.run(({ hot, expectObservable }) => {
        actions$ = hot('-a--', {
          a: GuestBookPageActions.pageOpened(),
        });

        expectObservable(effects.loadEntries$).toBe('----');
      });
    });
  });

  describe('saveEntry$', () => {
    it('should return saved success on entry saved', () => {
      const entry: GuestBookEntry = {
        author: {
          name: 'Author 1',
          email: 'author1@example.com',
        },
        message: 'Message 1',
      };

      const savedEntry: GuestBookEntry = {
        ...entry,
        id: 1,
      };

      testScheduler.run(({ cold, hot, expectObservable }) => {
        actions$ = hot('-a', {
          a: GuestBookPageActions.entrySaved({ entry }),
        });
        mockGuestBookService.save.and.returnValue(
          cold('--b|', { b: savedEntry }),
        );

        expectObservable(effects.saveEntry$).toBe('---c', {
          c: GuestBookApiActions.entrySavedSuccess({ entry: savedEntry }),
        });
      });
    });

    it('should return saved fail when service fails', () => {
      const entry: GuestBookEntry = {
        author: {
          name: 'Author 1',
          email: 'author1@example.com',
        },
        message: 'Message 1',
      };

      const error = 'test error';

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: GuestBookPageActions.entrySaved({ entry }) });
        mockGuestBookService.save.and.returnValue(
          cold('--#', undefined, error),
        );

        expectObservable(effects.saveEntry$).toBe('---c', {
          c: GuestBookApiActions.entrySavedFail({
            message: error,
          }),
        });
      });
    });
  });
});
