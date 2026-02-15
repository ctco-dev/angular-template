import { Component, Input } from '@angular/core';
import { GuestbookEntry } from '../../../models/guestbook.model';
import { NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Author } from 'src/app/models/author.model';
import { GuestbookAuthorDialogService } from '../services/guestbook-author-dialog.service';

@Component({
  selector: 'app-guestbook-list',
  imports: [NgFor, MatCardModule],
  templateUrl: './guestbook-list.component.html',
  styleUrl: './guestbook-list.component.scss'
})
export class GuestbookListComponent {
  @Input() guestPosts: GuestbookEntry[] | null = [];

  constructor(private authorDialogService: GuestbookAuthorDialogService) { }

  openAuthorDialog(author: Author): void {
      this.authorDialogService.openAuthorDialog(author);
  }
}
