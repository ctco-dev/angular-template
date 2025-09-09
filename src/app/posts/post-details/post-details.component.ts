import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { User } from 'src/app/users/user.model';
import { Post } from '../posts.model';

@Component({
  selector: 'app-post-details',
  imports: [MatCardModule, MatButtonModule, RouterLink, MatIcon],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailsComponent {
  post = input.required<Post>();
  user = input<User>();
  showActions = input<boolean>(true);
}
