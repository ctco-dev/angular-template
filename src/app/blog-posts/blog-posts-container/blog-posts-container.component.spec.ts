import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BlogPostsContainerComponent} from './blog-posts-container.component';
import {IBlogPost} from '../blog-posts.model';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {BlogPostsCommentComponent} from "../blog-posts-comment/blog-posts-comment.component";
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";

describe('BlogPostsContainerComponent', () => {
  let component: BlogPostsContainerComponent;
  let fixture: ComponentFixture<BlogPostsContainerComponent>;

  const mockBlogPost: IBlogPost = {
    id: 1,
    userId: 123,
    title: 'Blog Post 1',
    body: 'Blog Post contents #1',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, MatButtonModule, NoopAnimationsModule, BlogPostsCommentComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            snapshot: {paramMap: new Map()}
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BlogPostsContainerComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should bind @Input() blogpost correctly', () => {
    component.blogpost = mockBlogPost;
    fixture.detectChanges();
    expect(component.blogpost.title).toBe('Blog Post 1');
  });

  it('should bind @Input() expandedMode correctly', () => {
    component.blogpost = mockBlogPost;
    component.expandedMode = true;
    fixture.detectChanges();
    expect(component.expandedMode).toBeTrue();
  });

  it('should render blog post title in template', () => {
    component.blogpost = mockBlogPost;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Blog Post 1');
  });
});
