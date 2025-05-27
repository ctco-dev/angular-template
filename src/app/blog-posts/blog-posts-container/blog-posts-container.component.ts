import {Component, Input} from '@angular/core';
import {IBlogPost} from "../blog-post.model";

@Component({
  selector: 'app-blog-posts-container',
  imports: [],
  templateUrl: './blog-posts-container.component.html',
  styleUrl: './blog-posts-container.component.scss'
})
export class BlogPostsContainerComponent {
  @Input() blogposts!: IBlogPost[];
}
