import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { PostsPageActions } from 'src/app/posts/state/posts.actions';
import { User } from '../user.model';
import { UsersService } from '../users.service';
import { UsersApiActions } from './users.actions';
import { UsersEffects } from './users.effects';
import { selectUsersLoaded } from './users.selectors';

describe('UsersEffects', () => {
  let store: MockStore;
  let mockUsersService: jasmine.SpyObj<UsersService>;
  let testScheduler: TestScheduler;
  let actions$ = new Observable<Action>();
  let effects: UsersEffects;

  beforeEach(() => {
    mockUsersService = jasmine.createSpyObj(['getUsers']);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        provideMockStore({
          selectors: [
            {
              selector: selectUsersLoaded,
              value: false,
            },
          ],
        }),
        UsersEffects,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    });

    actions$ = TestBed.inject(Actions);
    effects = TestBed.inject(UsersEffects);
    store = TestBed.inject(MockStore);
  });

  describe('loadUsers$', () => {
    it('should return loaded success on pageOpened', () => {
      const users: User[] = [
        {
          id: 1,
          name: 'User 1',
        },
        {
          id: 2,
          name: 'User 2',
        },
      ];

      testScheduler.run(({ cold, hot, expectObservable }) => {
        actions$ = hot('-a', {
          a: PostsPageActions.pageOpened(),
        });
        mockUsersService.getUsers.and.returnValue(cold('--b|', { b: users }));

        expectObservable(effects.loadUsers$).toBe('---c', {
          c: UsersApiActions.usersLoadedSuccess({ users }),
        });
      });
    });

    it('should return loaded fail when service fails', () => {
      const error = 'test error';
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: PostsPageActions.pageOpened() });
        mockUsersService.getUsers.and.returnValue(
          cold('--#', undefined, error),
        );

        expectObservable(effects.loadUsers$).toBe('---c', {
          c: UsersApiActions.usersLoadedFail({
            message: error,
          }),
        });
      });
    });

    it('should not load entries when they were already loaded', () => {
      store.overrideSelector(selectUsersLoaded, true);
      testScheduler.run(({ hot, expectObservable }) => {
        actions$ = hot('-a--', {
          a: PostsPageActions.pageOpened(),
        });

        expectObservable(effects.loadUsers$).toBe('----');
      });
    });
  });
});
