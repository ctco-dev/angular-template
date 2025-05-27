import { Component, OnInit } from '@angular/core';
import { IBlog } from '../blog-list/blog.model';
import { IComment } from './comment.model';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from './blog.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { startWith, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-blog-comment',
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-comment.component.html',
  styleUrl: './blog-comment.component.scss'
})
export class BlogCommentComponent{
  blogId!: number; // Assuming blogId is set somewhere in the component
  blog$ = this.route.paramMap.pipe(
    switchMap(params => this.blogService.getBlog(Number(params.get('id'))))
  );
  private refreshComments$ = new Subject<void>();

comments$ = this.refreshComments$.pipe(
  startWith(null), // so it loads initially
  switchMap(() => this.route.paramMap.pipe(
    switchMap(params => this.blogService.getComments(Number(params.get('id'))))
  ))
);
  newComment: IComment = {
    id: 0,
    name: '',
    email: '',
    message: '',
    date: new Date()
  };
  constructor(private route: ActivatedRoute, private blogService: BlogService) {
      this.route.paramMap.subscribe(params => {
    this.blogId = Number(params.get('id'));
    // Now you can use blogId in your component
    console.log('Blog ID from URL:', this.blogId);
  });
    }

  addComment() {
    if (this.newComment.name && this.newComment.email && this.newComment.message) {
      this.newComment.date = new Date();
      console.log('blog Id to sed:', this.blogId);
      this.blogService.postComment(this.blogId, this.newComment).subscribe(comment => {
        // Optionally, you can handle the response here
        console.log('Comment added:', comment);
      });
        // Refresh the comments list
    this.refreshComments$.next();
      this.newComment = { id: 0, name: '', email: '', message: '', date: new Date() }; // Reset form
    } else {
      alert('Please fill in all fields.');
    }
  }
}
