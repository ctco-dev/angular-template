import {Component, inject} from '@angular/core';
import {BlogPostsService} from "./blog-posts.service";
import {BlogPostsContainerComponent} from "./blog-posts-container/blog-posts-container.component";
import {IBlogPost} from "./blog-post.model";
import {MatSnackBar} from '@angular/material/snack-bar';

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
  private snackbar = inject(MatSnackBar);
  blogPosts: IBlogPost[] = [];

  constructor() {
    this.blogPostsService
      .getBlogPosts()
      .subscribe({
          next: (blogPosts) => this.blogPosts = blogPosts,
          error: (err) => this.snackbar.open(err.message, 'OK', {
            duration: 5000
          })
        }
      );
  }
}
