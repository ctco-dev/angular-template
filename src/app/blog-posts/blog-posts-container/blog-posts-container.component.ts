import {Component, Input} from '@angular/core';
import {IBlogPost} from "../blog-post.model";
import {MatCard, MatCardContent, MatCardHeader, MatCardSmImage, MatCardSubtitle, MatCardTitle, MatCardTitleGroup} from "@angular/material/card";

@Component({
  selector: 'app-blog-posts-container',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardTitleGroup, MatCardContent, MatCardSubtitle, MatCardSmImage],
  templateUrl: './blog-posts-container.component.html',
  styleUrl: './blog-posts-container.component.scss'
})
export class BlogPostsContainerComponent {
  @Input() blogposts!: IBlogPost[];
}
