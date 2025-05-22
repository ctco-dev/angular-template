import { Component, input } from '@angular/core';
import { Post } from '../posts.model';

@Component({
  selector: 'app-posts-list',
  imports: [],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss',
})
export class PostsListComponent {
  posts = input<Post[]>([]);
}
