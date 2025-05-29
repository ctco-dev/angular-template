import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailsComponent } from './post-details.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PostDetailsComponent', () => {
  let component: PostDetailsComponent;
  let fixture: ComponentFixture<PostDetailsComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostDetailsComponent],
      providers: [provideMockStore()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
