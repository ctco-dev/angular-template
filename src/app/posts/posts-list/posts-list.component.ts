import { Component, Input } from '@angular/core';
import { Post } from '../post';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-posts-list',
  imports: [NgFor, NgIf],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss'
})
export class PostsListComponent {
  @Input() posts: Post[] | null = [];
}
