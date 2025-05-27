import {Component, Input} from '@angular/core';
import {IBlogPost} from "../blog-post.model";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatCardTitleGroup} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-blog-posts-container',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardTitleGroup, MatCardContent, MatCardActions, MatButton, RouterLink],
  templateUrl: './blog-posts-container.component.html',
  styleUrl: './blog-posts-container.component.scss'
})
export class BlogPostsContainerComponent {
  @Input() blogposts!: IBlogPost[];
}
