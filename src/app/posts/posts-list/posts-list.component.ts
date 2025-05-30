import { Component, Input } from '@angular/core';
import { Post } from '../post';
import { User } from 'src/app/users/user.model';
import { Dictionary } from '@ngrx/entity';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-posts-list',
  imports: [MatCardModule, RouterLink, MatButtonModule],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss'
})
export class PostsListComponent {
  @Input() posts: Post[] | null = [];
  @Input() users: Dictionary<User> | null = {};
}
