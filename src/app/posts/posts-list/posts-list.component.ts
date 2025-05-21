import { Component, inject } from '@angular/core';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts-list',
  imports: [],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss'
})
export class PostsListComponent {
  postsService: PostsService = inject(PostsService);
}
