import {Component, inject, Input} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {IBlogPost, IBlogPostComment} from "../blog-post.model";
import {HttpErrorResponse} from "@angular/common/module.d-CnjH8Dlt";
import {BlogPostsService} from "../blog-posts.service";

@Component({
  selector: 'app-blog-posts-container',
  imports: [],
  templateUrl: './blog-posts-comments.component.html',
  styleUrl: './blog-posts-comments.component.scss'
})
export class BlogPostsCommentsComponent {
  private snackbar = inject(MatSnackBar);
  private blogPostsService: BlogPostsService = inject(BlogPostsService);

  @Input() blogPostId: number;
  blogPost: IBlogPost;
  blogPostComments: IBlogPostComment[];

  constructor() {
    this.blogPostsService.getBlogPostById(this.blogPostId).subscribe({
      next: (blogPost: IBlogPost) => this.blogPost = blogPost,
      error: (err: HttpErrorResponse) => this.showError(err)
    });
    this.blogPostsService.getBlogPostCommentsById(this.blogPostId).subscribe({
      next: (blogPostComments: IBlogPostComment[]) => this.blogPostComments = blogPostComments,
      error: (err: HttpErrorResponse) => this.showError(err)
    });
  }

  private showError(err: HttpErrorResponse) {
    return this.snackbar.open(err.message, 'OK', {
      duration: 5000
    });
  }
}
