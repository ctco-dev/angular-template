import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BlogService } from './blog.service';
import { IBlog } from './blog.model';
import { IComment } from './comment.model';

describe('BlogService', () => {
  let service: BlogService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BlogService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request to fetch a blog by id', () => {
    const mockBlog: IBlog = {
      id: 1,
      title: 'Test Blog',
      blogHtml: '<p>Test</p>',
      date: new Date(),
      author: 'Tester'
    };

    service.getBlog(1).subscribe(blog => {
      expect(blog).toEqual(mockBlog);
    });

    const req = httpMock.expectOne('/api/blogs/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockBlog);
  });

  it('should make a Get request to fetch all comments by blog id', () => {
    const mockComments: IComment[] = [
      { id: 1, message: 'Great post!', name: 'User1', email: 'test1@test1', date: new Date() },
      { id: 2, message: 'Thanks for sharing!', name: 'User2', email: 'test2@test2', date: new Date() }
    ];
    service.getComments(1).subscribe(comments => {
      expect(comments).toEqual(mockComments);
    });

    const req = httpMock.expectOne('/api/blogs/1/comments');
    expect(req.request.method).toBe('GET');
    req.flush(mockComments);
  });
});
