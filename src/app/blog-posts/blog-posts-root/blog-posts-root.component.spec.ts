import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BlogPostsRootComponent} from './blog-posts-root.component';
import {provideMockStore, MockStore} from '@ngrx/store/testing';
import {selectAllBlogPosts} from '../blog-posts.selectors';

describe('BlogPostsRootComponent', () => {
  let component: BlogPostsRootComponent;
  let fixture: ComponentFixture<BlogPostsRootComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostsRootComponent],
      providers: [
        provideMockStore({
            initialState: {
              loadedPosts: []
            }
          }
        )
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectAllBlogPosts, []);

    fixture = TestBed.createComponent(BlogPostsRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });
});
