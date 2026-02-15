import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-posts-list',
  imports: [
    NgFor,
    MatCardModule,
    MatButton,
    RouterLink
  ],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss'
})
export class PostsListComponent {
  @Input() posts: Post[] | null = [];
}
