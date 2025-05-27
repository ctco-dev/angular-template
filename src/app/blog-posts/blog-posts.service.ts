import {inject, Injectable} from '@angular/core';
import {IBlogPost, IBlogPostComment} from './blog-post.model'
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BASE_URL} from "../../config";

@Injectable({
  providedIn: 'root'
})
export class BlogPostsService {

  private httpClient = inject(HttpClient);

  getBlogPosts(): Observable<IBlogPost[]> {
    return this.httpClient.get<IBlogPost[]>(BASE_URL + "/posts")
  }

  getBlogPostCommentsById(postId: number): Observable<IBlogPostComment[]> {
    return this.httpClient.get<IBlogPostComment[]>(BASE_URL + "/posts/" + postId)
  }
}
