import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Post } from '../posts.model';

@Component({
  selector: 'app-posts-list',
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss',
})
export class PostsListComponent {
  posts = input<Post[]>([]);
  errorMessage = input<string>('');
}
