import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Post, PostComment } from './posts.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  private http = inject(HttpClient);

  getPosts() {
    return this.http
      .get<Post[]>(this.postsUrl)
      .pipe(catchError(this.handleError));
  }

  getComments(postId: number) {
    return this.http
      .get<PostComment[]>(this.getCommentsUrl(postId))
      .pipe(catchError(this.handleError));
  }

  private getCommentsUrl(postId: number) {
    return `${this.postsUrl}/${postId}/comments`;
  }

  private handleError({ status }: HttpErrorResponse) {
    return throwError(() => `${status}: An error occured.`);
  }
}
