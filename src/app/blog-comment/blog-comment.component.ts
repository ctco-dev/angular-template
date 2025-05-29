import { Component, signal } from '@angular/core';
import { IBlog } from '../blog-list/blog.model';
import { IComment } from './comment.model';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from './blog.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { map, switchMap, combineLatest, catchError } from 'rxjs';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-blog-comment',
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-comment.component.html',
  styleUrl: './blog-comment.component.scss'
})
export class BlogCommentComponent {
  readonly blogIdSignal = toSignal(
    this.route.paramMap.pipe(map(params => Number(params.get('id')))),
    { initialValue: 0 }
  );

  private blogId$ = this.route.paramMap.pipe(map(params => Number(params.get('id'))));

  private refreshComments = signal(0);

  errorMessage: string | null = null;

  readonly blogSignal = toSignal(
    this.route.paramMap.pipe(
      switchMap(params =>
        this.blogService.getBlog(Number(params.get('id'))).pipe(
          catchError(() => {
            this.errorMessage = 'Failed to load blog. Redirecting...';
            setTimeout(() => {
              this.errorMessage = null;
              window.location.href = '/blogs';
            }, 2000);
            // Return an empty blog object to keep types happy
            return [
              { id: 0, title: '', blogHtml: '', date: new Date(), author: '' } as IBlog
            ];
          })
        )
      )
    ),
    { initialValue: { id: 0, title: '', blogHtml: '', date: new Date(), author: '' } as IBlog }
  );

  private comments$ = combineLatest([
    this.blogId$,
    toObservable(this.refreshComments)
  ]).pipe(
    switchMap(([blogId]) => this.blogService.getComments(blogId))
  );

  readonly commentsSignal = toSignal(this.comments$, { initialValue: [] as IComment[] });

  newComment: IComment = {
    id: 0,
    name: '',
    email: '',
    message: '',
    date: new Date()
  };



  constructor(private route: ActivatedRoute, private blogService: BlogService) {}

  addComment(form: NgForm) {
    if (this.newComment.name && this.newComment.email && this.newComment.message) {
      this.newComment.date = new Date();
      this.blogService.postComment(this.blogIdSignal(), this.newComment).subscribe(() => {
        this.refreshComments.update(v => v + 1); // trigger refresh
        this.newComment = { id: 0, name: '', email: '', message: '', date: new Date() };
        form.resetForm();
      });
    } else {
      alert('Please fill in all fields.');
    }
  }
}
