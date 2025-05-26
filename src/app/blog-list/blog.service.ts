import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBlog } from './blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }
  /**
   * Fetches the list of blogs from the server.
   * @returns An Observable that emits an array of IBlog objects.
   */
  getBlogs(): Observable<IBlog[]> {
    return this.http.get<IBlog[]>('/api/blogs');
  }
}
