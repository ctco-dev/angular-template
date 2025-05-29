import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BlogService } from './blog.service';
import { IBlog } from './blog.model';

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
});
