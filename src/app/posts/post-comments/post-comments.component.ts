import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import {
  MatList,
  MatListItem,
  MatListItemIcon,
  MatListItemLine,
  MatListItemTitle,
} from '@angular/material/list';
import { PostComment } from '../posts.model';

@Component({
  selector: 'app-post-comments',
  imports: [
    MatList,
    MatListItem,
    MatListItemTitle,
    MatListItemLine,
    MatIcon,
    MatListItemIcon,
    MatCard,
    MatCardContent,
  ],
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCommentsComponent {
  comments = input<PostComment[]>([]);
}
