import { Component, signal } from '@angular/core';
import { IBlog } from '../blog-list/blog.model';
import { IComment } from './comment.model';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from './blog.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map, switchMap, combineLatest } from 'rxjs';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-blog-comment',
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-comment.component.html',
  styleUrl: './blog-comment.component.scss'
})
export class BlogCommentComponent {
  // Signal for blogId from route
  readonly blogIdSignal = toSignal(
    this.route.paramMap.pipe(map(params => Number(params.get('id')))),
    { initialValue: 0 }
  );

  // Observable for blogId (for combineLatest)
  private blogId$ = this.route.paramMap.pipe(map(params => Number(params.get('id'))));

  // Signal to trigger refresh
  private refreshComments = signal(0);

  // Signal for blog
  readonly blogSignal = toSignal(
    this.route.paramMap.pipe(
      switchMap(params => this.blogService.getBlog(Number(params.get('id'))))
    ),
    { initialValue: { id: 0, title: '', blogHtml: '', date: new Date(), author: '' } as IBlog }
  );

  // Observable for comments (refreshes on blogId or refresh)
  private comments$ = combineLatest([
    this.blogId$,
    toObservable(this.refreshComments) // convert signal to observable
  ]).pipe(
    switchMap(([blogId]) => this.blogService.getComments(blogId))
  );

  // Signal for comments
  readonly commentsSignal = toSignal(this.comments$, { initialValue: [] as IComment[] });

  newComment: IComment = {
    id: 0,
    name: '',
    email: '',
    message: '',
    date: new Date()
  };

  constructor(private route: ActivatedRoute, private blogService: BlogService) {}

  addComment() {
    if (this.newComment.name && this.newComment.email && this.newComment.message) {
      this.newComment.date = new Date();
      this.blogService.postComment(this.blogIdSignal(), this.newComment).subscribe(() => {
        this.refreshComments.update(v => v + 1); // trigger refresh
        this.newComment = { id: 0, name: '', email: '', message: '', date: new Date() };
      });
    } else {
      alert('Please fill in all fields.');
    }
  }
}
