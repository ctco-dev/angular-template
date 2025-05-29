import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PostsPageComponent } from './posts-page.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectPosts, selectPostsErrorMessage, selectPostsLoading } from 'src/app/store/post/posts.selectors';

describe('PostsPageComponent', () => {
  let component: PostsPageComponent;
  let fixture: ComponentFixture<PostsPageComponent>;
  let store: MockStore;

  const mockPosts = [
    { id: 1, title: 'Test Post 1', body: 'Test Body 1', userId: 1 },
    { id: 2, title: 'Test Post 2', body: 'Test Body 2', userId: 1 }
  ];

  const initialState = {
    posts: {
      loading: false,
      errorMessage: '',
      ids: [1, 2],
      entities: {
        1: mockPosts[0],
        2: mockPosts[1]
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PostsPageComponent,
        RouterTestingModule
      ],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            { selector: selectPostsLoading, value: false },
            { selector: selectPostsErrorMessage, value: '' },
            { selector: selectPosts, value: mockPosts }
          ]
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(PostsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading state', () => {
    store.overrideSelector(selectPostsLoading, true);
    store.refreshState();
    fixture.detectChanges();

    expect(component.loading()).toBe(true);
  });

  it('should show error message', () => {
    const errorMessage = 'Test error';
    store.overrideSelector(selectPostsErrorMessage, errorMessage);
    store.refreshState();
    fixture.detectChanges();

    expect(component.errorMessage()).toBe(errorMessage);
  });

  it('should display posts', () => {
    store.overrideSelector(selectPosts, mockPosts);
    store.refreshState();
    fixture.detectChanges();

    expect(component.posts()).toEqual(mockPosts);
  });

  it('should be empty posts', () => {
    store.overrideSelector(selectPosts, []);
    store.refreshState();
    fixture.detectChanges();

    expect(component.posts()).toEqual([]);
  });
});
