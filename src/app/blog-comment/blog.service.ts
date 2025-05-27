import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBlog } from './blog.model';
import { Observable } from 'rxjs';
import { IComment } from './comment.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }
  getBlog(id: number): Observable<IBlog> {
    return this.http.get<IBlog>(`/api/blogs/${id}`);
  }
  getComments(blogId: number): Observable<IComment[]> {
    return this.http.get<IComment[]>(`/api/blogs/${blogId}/comments`);
  }
  postComment(blogId: number, comment: IComment): Observable<IComment> {
    console.log('Posting comment:', comment);
    return this.http.post<IComment>(`/api/blogs/${blogId}/comments`, comment);
  }
}
