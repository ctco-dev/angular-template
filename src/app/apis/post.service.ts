import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = environment.apiUrl + '/posts';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Post[]> {
    return this.http
      .get<Post[]>(this.url)
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<Post> {
    return this.http
      .get<Post>(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError({ status }: HttpErrorResponse) {
    return throwError(
      () => `${status}: ERROR - Unable to fetch posts`
    );
  }
}
