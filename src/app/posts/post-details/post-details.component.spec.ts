import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailsComponent } from './post-details.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  selectPostById,
  selectPostErrorMessage,
  selectPostId,
  selectPostsLoading,
} from '../state/posts.selectors';
import { selectUserEntities, selectUserLoading } from 'src/app/users/state/users.selectors';
import { PostsService } from '../posts.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('PostDetailsComponent', () => {
  let component: PostDetailsComponent;
  let fixture: ComponentFixture<PostDetailsComponent>;
  let mockStore: MockStore;
  let mockPostsService: PostsService;

  beforeEach(async () => {
    mockPostsService = jasmine.createSpyObj<PostsService>('PostsService', ['getCommentsById']);

    await TestBed.configureTestingModule({
      imports: [PostDetailsComponent],
      providers: [provideMockStore(),
        {
          provide: PostsService,
          useValue: mockPostsService
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: 1}),
          }
        }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    mockStore = TestBed.inject(MockStore);
    mockStore.overrideSelector(selectPostId, Number(1));

    mockStore.overrideSelector(
      selectPostById,
      {
        id: 1,
        body:'body1',
        title:'title1',
        userId: 2
      },
    );

    mockStore.overrideSelector(
      selectUserEntities,
      {
        ['2']: {
          id: 2,
          email:'email@test.com',
          name:'name2',
          username:'username2'
        }
      });

    mockStore.overrideSelector(selectUserLoading, false);
    mockStore.overrideSelector(selectPostsLoading, false);
    mockStore.overrideSelector(selectPostErrorMessage, '');

    fixture = TestBed.createComponent(PostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
