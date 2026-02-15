import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBlog } from './blog.model';
import { Observable, of } from 'rxjs';
import { IComment } from './comment.model';
import { tap, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogCache = new Map<number, Observable<IBlog>>();

  constructor(private http: HttpClient) { }

  getBlog(id: number): Observable<IBlog> {
    if (this.blogCache.has(id)) {
      console.log(`BlogService: Returning blog ${id} from cache`);
      return this.blogCache.get(id)!;
    }
    console.log(`BlogService: Fetching blog ${id} from HTTP`);
    const blog$ = this.http.get<IBlog>(`/api/blogs/${id}`).pipe(
      shareReplay(1)
    );
    this.blogCache.set(id, blog$);
    return blog$;
  }

  getComments(blogId: number): Observable<IComment[]> {
    return this.http.get<IComment[]>(`/api/blogs/${blogId}/comments`);
  }

  postComment(blogId: number, comment: IComment): Observable<IComment> {
    console.log('Posting comment:', comment);
    return this.http.post<IComment>(`/api/blogs/${blogId}/comments`, comment);
  }
}
