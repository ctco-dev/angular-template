import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { User } from 'src/app/users/user.model';
import { PostDetailsComponent } from '../post-details/post-details.component';
import { Post } from '../posts.model';

@Component({
  selector: 'app-posts-list',
  imports: [PostDetailsComponent],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsListComponent {
  posts = input<Post[]>([]);
  users = input<Record<string, User | undefined>>({});
  errorMessage = input<string>('');
}
