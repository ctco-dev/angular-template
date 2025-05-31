import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BlogPostsRootComponent} from './blog-posts-root.component';
import {BlogPostsContainerComponent} from '../blog-posts-container/blog-posts-container.component';
import {provideMockStore, MockStore} from '@ngrx/store/testing';
import {BlogPostState} from '../blog-posts.store';
import {BlogPostActions} from '../blog-posts.actions';
import {selectAllBlogPosts} from '../blog-posts.selectors';
import {IBlogPost} from "../blog-posts.model";

describe('BlogPostsRootComponent', () => {
  let component: BlogPostsRootComponent;
  let fixture: ComponentFixture<BlogPostsRootComponent>;
  let store: MockStore<BlogPostState>;
  let dispatchSpy: jasmine.Spy;

  const mockBlogPosts: IBlogPost[] = [
    {
      id: 1,
      userId: 123,
      title: 'Post 1',
      body: 'Blog Post contents #1',
    },
    {
      id: 2,
      userId: 234,
      title: 'Post 2',
      body: 'Blog Post contents #2',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostsContainerComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectAllBlogPosts,
              value: mockBlogPosts
            }
          ]
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(BlogPostsRootComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch "page-opened" action on init', () => {
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(BlogPostActions['page-opened']());
  });

  it('should select blog posts from the store', () => {
    expect(component.blogPosts()).toEqual(mockBlogPosts);
  });
});
