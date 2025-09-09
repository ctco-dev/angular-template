import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { handleError } from '../utils/http';
import { Post, PostComment } from './posts.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  private http = inject(HttpClient);

  getPosts() {
    return this.http.get<Post[]>(this.postsUrl).pipe(catchError(handleError));
  }

  getComments(postId: number) {
    return this.http
      .get<PostComment[]>(this.getCommentsUrl(postId))
      .pipe(catchError(handleError));
  }

  private getCommentsUrl(postId: number) {
    return `${this.postsUrl}/${postId}/comments`;
  }
}
