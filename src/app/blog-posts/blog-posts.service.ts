import {Injectable} from '@angular/core';
import {IBlogPost} from './blog-post.model'

@Injectable({
  providedIn: 'root'
})
export class BlogPostsService {

  getBlogPosts(): IBlogPost[] {
    return [{
      id: 1,
    }];
  }
}
