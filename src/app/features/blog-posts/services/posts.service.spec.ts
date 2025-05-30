import { TestBed } from '@angular/core/testing';
import { PostsService } from './posts.service';
import { HttpClient } from '@angular/common/http';

describe('PostsService', () => {
  let service: PostsService;
  let httpServiceceSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [PostsService, { provide: HttpClient, useValue: spy }]
    });
    service = TestBed.inject(PostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
