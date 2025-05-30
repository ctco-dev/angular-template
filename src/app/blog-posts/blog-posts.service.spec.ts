import {TestBed} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting,} from '@angular/common/http/testing';
import {BlogPostsService} from './blog-posts.service';
import {IBlogPost, IBlogPostComment} from './blog-posts.model';
import {BASE_URL} from "../../config";
import {firstValueFrom} from "rxjs";

describe('BlogPostServiceTests', () => {
  let blogPostService: BlogPostsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogPostsService, provideHttpClient(), provideHttpClientTesting()],
    });
    blogPostService = TestBed.inject(BlogPostsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should return posts array from getPosts', async () => {
    const mockedBlogPostResponse: IBlogPost[] = [
      {
        id: 1,
        userId: 123,
        title: 'Post 1',
        body: 'Blog Post contents #1',
      },
      {
        id: 2,
        userId: 234,
        title: 'Post 2',
        body: 'Blog Post contents #2',
      },
    ];

    const blogPosts = firstValueFrom(blogPostService.getBlogPosts());
    httpTestingController
      .expectOne({method: 'GET', url: BASE_URL + '/posts'}, 'Retrieval of all BlogPosts')
      .flush(mockedBlogPostResponse);
    expect(await blogPosts).toEqual(mockedBlogPostResponse);
  });

  it('should return comments array for the provided post ID from getComments', async () => {
    const mockedCommentByIdResponse: IBlogPostComment[] = [
      {
        id: 123,
        postId: 1,
        name: 'Mr.Commenter 1',
        email: 'commenter1@gmail.com',
        body: 'That is a nice comment',
      },
      {
        id: 234,
        postId: 2,
        name: 'Mr.Commenter the second',
        email: 'commenter2@gmail.com',
        body: 'This comment is even better',
      }
    ];

    const postId = 1;
    const commentsPromise = firstValueFrom(blogPostService.getBlogPostCommentsById(postId));

    httpTestingController
      .expectOne({method: 'GET', url: BASE_URL + '/posts/' + postId + '/comments'})
      .flush(mockedCommentByIdResponse);

    expect(await commentsPromise).toEqual(mockedCommentByIdResponse);
  });
});
