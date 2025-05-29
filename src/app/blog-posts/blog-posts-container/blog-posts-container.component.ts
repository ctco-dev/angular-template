import {Component, Input} from '@angular/core';
import {IBlogPost} from "../blog-posts.model";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatCardTitleGroup} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-blog-posts-container',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardTitleGroup, MatCardContent, MatCardActions, MatButton, RouterLink, MatCardSubtitle],
  templateUrl: './blog-posts-container.component.html',
  styleUrl: './blog-posts-container.component.scss'
})
export class BlogPostsContainerComponent {
  @Input() blogpost!: IBlogPost;
  @Input() expandedMode!: boolean;
}
