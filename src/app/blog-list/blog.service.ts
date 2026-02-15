import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBlog } from './blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  readonly blogs$ = this.http.get<IBlog[]>('/api/blogs');

  constructor(private http: HttpClient) { }
}
