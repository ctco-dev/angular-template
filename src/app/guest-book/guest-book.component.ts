import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment-panel/comment/comment.component';

@Component({
  selector: 'app-guest-book',
  imports: [CommentComponent, FormsModule, CommonModule],
  standalone: true,
  templateUrl: './guest-book.component.html',
  styleUrl: './guest-book.component.scss'
})
export class GuestBookComponent {

}
