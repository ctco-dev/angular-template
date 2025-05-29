import { TestBed } from '@angular/core/testing';
import { PostsService } from './posts.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment.test';
import { Post } from './post';
import { firstValueFrom } from 'rxjs';

describe('PostsService', () => {
  let service: PostsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });

    service = TestBed.inject(PostsService);
    http = TestBed.inject(HttpTestingController);
    environment.blogApiUrl = 'https://test.api';
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('getAll should return expected POSTS', (done) => {
    // arrange
    let response$ = service.getAll();
    let reponsePromise = firstValueFrom(response$);
    const request = http.expectOne({
      url: environment.blogApiUrl + '/posts',
      method: 'get'
    });
    const defaultPosts: Post[] = [{id:1, body: 'body text', title: 'some title', userId:2}];
    request.flush(defaultPosts);
    // act

    // assert
    reponsePromise.then((value) => {
      expect(value).toEqual(defaultPosts);
      done();
    })
    .catch(done);
  });
});
