import { Component, Input } from '@angular/core';
import { Post } from '../post';
import { NgFor, NgIf } from '@angular/common';
import { User } from 'src/app/users/user.model';
import { Dictionary } from '@ngrx/entity';

@Component({
  selector: 'app-posts-list',
  imports: [NgFor, NgIf],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss'
})
export class PostsListComponent {
  @Input() posts: Post[] | null = [];
  @Input() users: Dictionary<User> | null = {};
}
