import { Component, inject, signal } from '@angular/core';
import { PostsListComponent } from '../posts-list/posts-list.component';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts-page',
  imports: [PostsListComponent],
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.scss',
})
export class PostsPageComponent {
  private service = inject(PostsService);

  readonly posts = this.service.posts;
}
