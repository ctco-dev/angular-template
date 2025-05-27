import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostsContainerComponent } from './blog-posts-container.component';

describe('BlogPostsContainerComponent', () => {
  let component: BlogPostsContainerComponent;
  let fixture: ComponentFixture<BlogPostsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostsContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogPostsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
