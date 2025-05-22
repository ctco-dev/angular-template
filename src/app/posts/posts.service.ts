import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, throwError } from 'rxjs';
import { Post } from './posts.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';

  private http = inject(HttpClient);

  constructor() {}

  getPosts() {
    return this.http
      .get<Post[]>(this.postsUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError({ status }: HttpErrorResponse) {
    return throwError(() => `${status}: An error occured.`);
  }
}
