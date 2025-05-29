import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { Post } from '../posts.model';
import { PostsService } from '../posts.service';
import {
  PostPageActions,
  PostsApiActions,
  PostsPageActions,
} from './posts.actions';
import { PostsEffects } from './posts.effects';
import { selectPostsLoaded } from './posts.selectors';

describe('PostsEffects', () => {
  let store: MockStore;
  let mockPostsService: jasmine.SpyObj<PostsService>;
  let testScheduler: TestScheduler;
  let actions$ = new Observable<Action>();
  let effects: PostsEffects;

  beforeEach(() => {
    mockPostsService = jasmine.createSpyObj(['getPosts']);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        provideMockStore({
          selectors: [
            {
              selector: selectPostsLoaded,
              value: false,
            },
          ],
        }),
        PostsEffects,
        {
          provide: PostsService,
          useValue: mockPostsService,
        },
      ],
    });

    actions$ = TestBed.inject(Actions);
    effects = TestBed.inject(PostsEffects);
    store = TestBed.inject(MockStore);
  });

  describe('loadPosts$ on PostsPageActions.pageOpened', () => {
    it('should return loaded success', () => {
      const posts: Post[] = [
        {
          id: 1,
          userId: 1,
          title: 'Title 1',
          body: 'Body 1',
        },
        {
          id: 2,
          userId: 2,
          title: 'Title 2',
          body: 'Body 2',
        },
      ];

      testScheduler.run(({ cold, hot, expectObservable }) => {
        actions$ = hot('-a', {
          a: PostsPageActions.pageOpened(),
        });
        mockPostsService.getPosts.and.returnValue(cold('--b|', { b: posts }));

        expectObservable(effects.loadPosts$).toBe('---c', {
          c: PostsApiActions.postsLoadedSuccess({ posts }),
        });
      });
    });

    it('should return loaded fail when service fails', () => {
      const error = 'test error';
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: PostsPageActions.pageOpened() });
        mockPostsService.getPosts.and.returnValue(
          cold('--#', undefined, error),
        );

        expectObservable(effects.loadPosts$).toBe('---c', {
          c: PostsApiActions.postsLoadedFail({
            message: error,
          }),
        });
      });
    });

    it('should not load entries when they were already loaded', () => {
      store.overrideSelector(selectPostsLoaded, true);
      testScheduler.run(({ hot, expectObservable }) => {
        actions$ = hot('-a--', {
          a: PostsPageActions.pageOpened(),
        });

        expectObservable(effects.loadPosts$).toBe('----');
      });
    });
  });

  describe('loadPosts$ on PostPageActions.pageOpened', () => {
    it('should return loaded success', () => {
      const posts: Post[] = [
        {
          id: 1,
          userId: 1,
          title: 'Title 1',
          body: 'Body 1',
        },
        {
          id: 2,
          userId: 2,
          title: 'Title 2',
          body: 'Body 2',
        },
      ];

      testScheduler.run(({ cold, hot, expectObservable }) => {
        actions$ = hot('-a', {
          a: PostPageActions.pageOpened(),
        });
        mockPostsService.getPosts.and.returnValue(cold('--b|', { b: posts }));

        expectObservable(effects.loadPosts$).toBe('---c', {
          c: PostsApiActions.postsLoadedSuccess({ posts }),
        });
      });
    });

    it('should return loaded fail when service fails', () => {
      const error = 'test error';
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: PostPageActions.pageOpened() });
        mockPostsService.getPosts.and.returnValue(
          cold('--#', undefined, error),
        );

        expectObservable(effects.loadPosts$).toBe('---c', {
          c: PostsApiActions.postsLoadedFail({
            message: error,
          }),
        });
      });
    });

    it('should not load entries when they were already loaded', () => {
      store.overrideSelector(selectPostsLoaded, true);
      testScheduler.run(({ hot, expectObservable }) => {
        actions$ = hot('-a--', {
          a: PostPageActions.pageOpened(),
        });

        expectObservable(effects.loadPosts$).toBe('----');
      });
    });
  });
});
