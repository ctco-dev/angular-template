import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { Post, PostComment } from './posts.model';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let http: HttpTestingController;
  let service: PostsService;

  let DEFAULT_POSTS: Post[];
  let DEFAULT_COMMENTS: PostComment[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    http = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PostsService);

    DEFAULT_POSTS = [
      {
        id: 1,
        userId: 1,
        body: 'Body 1',
        title: 'Title 1',
      },
      {
        id: 2,
        userId: 2,
        body: 'Body 2',
        title: 'Title 2',
      },
      {
        id: 3,
        userId: 3,
        body: 'Body 3',
        title: 'Title 3',
      },
    ];

    DEFAULT_COMMENTS = [
      {
        id: 1,
        postId: 1,
        name: 'Name 1',
        email: 'email1@example.com',
        body: 'Comment 1',
      },
      {
        id: 2,
        postId: 1,
        name: 'Name 2',
        email: 'email2@example.com',
        body: 'Comment 2',
      },
      {
        id: 3,
        postId: 1,
        name: 'Name 3',
        email: 'email3@example.com',
        body: 'Comment 3',
      },
    ];
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should return posts array from getPosts', async () => {
    const posts$ = service.getPosts();
    const postsPromise = firstValueFrom(posts$);

    const req = http.expectOne({
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'GET',
    });
    req.flush(DEFAULT_POSTS);

    expect(await postsPromise).toEqual(DEFAULT_POSTS);
  });

  it('should return comments array for the provided post ID from getComments', async () => {
    const postId = 1;
    const comments$ = service.getComments(postId);
    const commentsPromise = firstValueFrom(comments$);

    const req = http.expectOne({
      url: 'https://jsonplaceholder.typicode.com/posts/1/comments',
      method: 'GET',
    });
    req.flush(DEFAULT_COMMENTS);

    expect(await commentsPromise).toEqual(DEFAULT_COMMENTS);
  });
});
