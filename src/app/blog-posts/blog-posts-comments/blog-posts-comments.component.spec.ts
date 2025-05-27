import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostsCommentsComponent } from './blog-posts-comments.component';

describe('BlogPostsCommentsComponent', () => {
  let component: BlogPostsCommentsComponent;
  let fixture: ComponentFixture<BlogPostsCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostsCommentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogPostsCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
