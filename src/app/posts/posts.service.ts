import { inject, Injectable } from '@angular/core';
import { Post } from './posts.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly postsUrl = 'https://jsonplaceholder.typicode.com/posts';

  private readonly http = inject(HttpClient);

  constructor() {}

  // TODO: Error handling
  getPosts() {
    return this.http.get<Post[]>(this.postsUrl).pipe(delay(2000)); // TODO: Remove delay
  }

  posts = toSignal(this.getPosts(), { initialValue: [] });
}
