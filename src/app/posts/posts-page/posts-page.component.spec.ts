import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsPageComponent } from './posts-page.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { PostsListComponent } from '../posts-list/posts-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  selectPostErrorMessage,
  selectPosts,
  selectPostsLoading,
} from '../state/posts.selectors';
import { PostsPageActions } from '../state/posts.actions';
import { selectUserEntities, selectUserLoading } from 'src/app/users/state/users.selectors';
import { User } from 'src/app/users/user.model';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';

describe('PostsPageComponent', () => {
  let component: PostsPageComponent;
  let fixture: ComponentFixture<PostsPageComponent>;
  let mockStore: MockStore; //jasmine.createSpyObj('Store', []);
  let collectionsSelector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        PostsPageComponent,
        PostsListComponent,
      ],
      providers: [provideMockStore(),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: 1}),
          }
        }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(PostsPageComponent);
    component = fixture.componentInstance;

    collectionsSelector = mockStore.overrideSelector(
      selectPosts,
      [
        {
          id: 1,
          body:'body1',
          title:'title1',
          userId: 2
        },
      ],
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

    fixture.detectChanges();
    //spyOn(mockGuestBookStore, 'dispatch').and.callFake(() => {});
  });

  it('should render post entries', () => {
    expect(fixture.debugElement.queryAll(By.css('.container')).length).toBe(1);
  });
});
