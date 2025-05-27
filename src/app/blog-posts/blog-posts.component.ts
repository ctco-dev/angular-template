import {Component, inject} from '@angular/core';
import {BlogPostsService} from "./blog-posts.service";
import {BlogPostsContainerComponent} from "./blog-posts-container/blog-posts-container.component";
import {IBlogPost} from "./blog-post.model";

@Component({
  selector: 'app-blog-posts',
  imports: [
    BlogPostsContainerComponent
  ],
  templateUrl: './blog-posts.component.html',
  styleUrl: './blog-posts.component.scss'
})
export class BlogPostsComponent {
  private blogPostsService: BlogPostsService = inject(BlogPostsService);

  blogPosts: IBlogPost[] = [];

  constructor() {
    this.blogPosts = this.blogPostsService.getBlogPosts();
  }
}
