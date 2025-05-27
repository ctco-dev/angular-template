import { Component, OnInit } from '@angular/core';
import { IBlog } from '../blog-list/blog.model';
import { IComment } from './comment.model';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from './blog.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-blog-comment',
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-comment.component.html',
  styleUrl: './blog-comment.component.scss'
})
export class BlogCommentComponent{
  blogId!: number;
  blog$ = this.route.paramMap.pipe(
    switchMap(params => this.blogService.getBlog(Number(params.get('id'))))
  );
  comments: IComment[] = [];
  newComment: IComment = {
    id: 0,
    name: '',
    email: '',
    message: '',
    date: new Date()
  };
  constructor(private route: ActivatedRoute, private blogService: BlogService) {
    }

  addComment() {
    if (this.newComment.name && this.newComment.email && this.newComment.message) {
      this.newComment.id = this.comments.length + 1; // Simple ID generation
      this.newComment.date = new Date();
      this.comments.push({ ...this.newComment });
      this.newComment = { id: 0, name: '', email: '', message: '', date: new Date() }; // Reset form
    } else {
      alert('Please fill in all fields.');
    }
  }
}
