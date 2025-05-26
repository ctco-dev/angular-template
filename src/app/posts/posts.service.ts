import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay } from 'rxjs';
import { Post } from './post';
import { environment } from 'src/environments/environment';
import { HttpErrorService } from '../utilities/http-error.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private postsUrl = environment.blogApiUrl + '/posts';

  constructor(
    private http: HttpClient,
    private errorHandler: HttpErrorService,
  ) {}

  getAll() {
    return this.http
      .get<Post[]>(this.postsUrl)
      .pipe(delay(2000), catchError(this.errorHandler.handleError));
  }

  getById(id: number) {
    return this.http
      .get<Post>(`${this.postsUrl}/${id}`)
      .pipe(catchError(this.errorHandler.handleError));
  }

  getCommentsById(id: number) {
    return this.http
      .get<Comment[]>(`${this.postsUrl}/${id}/comments`)
      .pipe(catchError(this.errorHandler.handleError));
  }
}
