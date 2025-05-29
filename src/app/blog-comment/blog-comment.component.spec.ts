import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BlogCommentComponent } from './blog-comment.component';
import { BlogService } from './blog.service';

describe('BlogCommentComponent (integration)', () => {
  let component: BlogCommentComponent;
  let fixture: ComponentFixture<BlogCommentComponent>;
  let blogService: BlogService;

  const mockBlog = {
    id: 1,
    title: 'Test Blog',
    blogHtml: '<p>Test Content</p>',
    date: new Date(),
    author: 'Tester'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BlogCommentComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => '1' })
          }
        },
        {
          provide: BlogService,
          useValue: {
            getBlog: () => of(mockBlog),
            getComments: () => of([]),
            postComment: () => of({})
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render blog title, author, and content', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.blog-details h2')?.textContent).toContain('Test Blog');
    expect(compiled.querySelector('.blog-meta')?.textContent).toContain('Tester');
    expect(compiled.querySelector('.blog-content')?.innerHTML).toContain('Test Content');
  });

  it('should show "No comments yet" when there are no comments', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.no-comments')?.textContent).toContain('No comments yet');
  });

  it('should show validation message if name is empty and touched', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const nameInput: HTMLInputElement = compiled.querySelector('input[name="name"]')!;
    nameInput.value = '';
    nameInput.dispatchEvent(new Event('input'));
    nameInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(compiled.querySelector('.validation-message')?.textContent).toContain('Name is required');
  });
});
