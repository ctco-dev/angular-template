import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSelectedEntry } from '../state/guest-book.selectors';
import { closeAuthorPopup } from '../state/guest-book.actions';
import { AvatarService } from '../services/avatar.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-author-popup',
    templateUrl: './author-popup.component.html',
    styleUrls: ['./author-popup.component.scss'],
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
})
export class AuthorPopupComponent {
    entry$ = this.store.select(selectSelectedEntry);
    avatarUrl = '';

    constructor(
        private store: Store,
        private avatarService: AvatarService
    ) {
        if (this.entry$ != undefined) {
            this.entry$.subscribe(entry => {
                if (entry) {
                    this.avatarUrl = this.avatarService.getGravatarUrl(entry.email);
                }
            });
        }
    }

    closePopUp() {
        this.store.dispatch(closeAuthorPopup());
    }
}