import {Component, Input} from '@angular/core';
import {IBlogPostComment} from "../blog-posts.model";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-blog-posts-comment',
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatIcon,
  ],
  templateUrl: './blog-posts-comment.component.html',
  styleUrl: './blog-posts-comment.component.scss'
})
export class BlogPostsCommentComponent {
  @Input() comment!: IBlogPostComment;
}
