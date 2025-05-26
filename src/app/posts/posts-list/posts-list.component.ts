import { Component, Input } from '@angular/core';
import { Post } from '../post';
import { NgIf } from '@angular/common';
import { User } from 'src/app/users/user.model';
import { Dictionary } from '@ngrx/entity';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-posts-list',
  imports: [NgIf, MatCardModule],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss'
})
export class PostsListComponent {
  @Input() posts: Post[] | null = [];
  @Input() users: Dictionary<User> | null = {};
}
