import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BlogPostsRootComponent} from './blog-posts-root.component';
import {provideMockStore} from "@ngrx/store/testing";

describe('BlogPostsRootComponent', () => {
  let component: BlogPostsRootComponent;
  let fixture: ComponentFixture<BlogPostsRootComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            loadedPosts: []
          }
        })
      ]
    })

    fixture = TestBed.createComponent(BlogPostsRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });
});
