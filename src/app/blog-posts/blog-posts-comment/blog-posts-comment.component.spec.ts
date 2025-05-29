import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostsCommentComponent } from './blog-posts-comment.component';

describe('BlogPostsCommentsComponent', () => {
  let component: BlogPostsCommentComponent;
  let fixture: ComponentFixture<BlogPostsCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostsCommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogPostsCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
