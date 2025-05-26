import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBlog } from './blog.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }
  getBlog(id: number): Observable<IBlog> {
    return this.http.get<IBlog>(`/blogs/${id}`);
  }
}
