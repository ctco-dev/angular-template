import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of, throwError } from 'rxjs';
import { selectUsersEntities } from 'src/app/users/state/users.selectors';
import { User } from 'src/app/users/user.model';
import { Post, PostComment } from '../posts.model';
import { PostsService } from '../posts.service';
import { PostPageActions } from '../state/posts.actions';
import {
  selectPostById,
  selectPostsErrorMessage,
} from '../state/posts.selectors';
import { PostPageComponent } from './post-page.component';

describe('PostPageComponent', () => {
  let mockPostsService: jasmine.SpyObj<PostsService>;
  let store: MockStore;
  let component: PostPageComponent;
  let fixture: ComponentFixture<PostPageComponent>;

  const user: User = {
    id: 1,
    name: 'Test User',
  };

  beforeEach(async () => {
    mockPostsService = jasmine.createSpyObj(['getComments']);

    TestBed.configureTestingModule({
      imports: [PostPageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 }),
          },
        },
        provideMockStore({
          selectors: [
            {
              selector: selectPostById,
              value: {
                id: 1,
                userId: user.id,
                title: 'Post Title',
                body: 'Post Body',
              } as Post,
            },
            {
              selector: selectPostsErrorMessage,
              value: '',
            },
            {
              selector: selectUsersEntities,
              value: {
                [user.id]: user,
              },
            },
          ],
        }),
        {
          provide: PostsService,
          useValue: mockPostsService,
        },
      ],
    });

    fixture = TestBed.createComponent(PostPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should dispatch page opened action on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();

    expect(dispatchSpy).toHaveBeenCalledOnceWith(PostPageActions.pageOpened());
  });

  it('should return user by current post user id', () => {
    expect(component.user()).toBe(user);
  });

  it('should return undefined user if post is undefined', () => {
    store.overrideSelector(selectPostById, undefined);
    expect(component.user()).toBeUndefined();
  });

  it('should return empty comments when post is undefined', () => {
    store.overrideSelector(selectPostById, undefined);
    fixture.detectChanges();
    expect(component.postComments()).toEqual([]);
  });

  it('should return post comments by id', () => {
    const comments: PostComment[] = [
      {
        id: 1,
        postId: 1,
        name: 'Name 1',
        email: 'email1@example.com',
        body: 'Body 1',
      },
      {
        id: 2,
        postId: 1,
        name: 'Name 2',
        email: 'email2@example.com',
        body: 'Body 2',
      },
    ];

    mockPostsService.getComments.and.returnValue(of(comments));
    fixture.detectChanges();

    expect(component.postComments()).toEqual(comments);
  });

  it('should return empty array and set error message on posts comments error', () => {
    const error = 'test error';
    mockPostsService.getComments.and.returnValue(throwError(() => error));

    fixture.detectChanges();

    expect(component.postComments()).toEqual([]);
    expect(component.commentsErrorMessage()).toEqual(error);
  });
});
