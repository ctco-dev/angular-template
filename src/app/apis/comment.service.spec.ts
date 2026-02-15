import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommentService } from './comment.service';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';

describe('CommentService', () => {
    let service: CommentService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CommentService]
        });
        service = TestBed.inject(CommentService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch comments by post', () => {
        const post: Post = { id: 1 } as Post;
        const mockComments: Comment[] = [
            { id: 1, postId: 1, body: 'Test comment' } as Comment
        ];

        service.getByPost(post).subscribe(comments => {
            expect(comments).toEqual(mockComments);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/comments/?postId=1`);
        expect(req.request.method).toBe('GET');
        req.flush(mockComments);
    });

    it('should handle error when fetching comments', () => {
        const post: Post = { id: 2 } as Post;
        const errorMsg = '404: ERROR - Unable to fetch posts';

        service.getByPost(post).subscribe({
            next: () => fail('should have failed with error'),
            error: (error) => {
                expect(error).toBe(errorMsg);
            }
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/comments/?postId=2`);
        req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
});
