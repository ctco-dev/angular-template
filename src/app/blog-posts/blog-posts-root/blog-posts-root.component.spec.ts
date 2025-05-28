import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostsRootComponent } from './blog-posts-root.component';

describe('BlogPostsCommentsComponent', () => {
  let component: BlogPostsRootComponent;
  let fixture: ComponentFixture<BlogPostsRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostsRootComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogPostsRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
