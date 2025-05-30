import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSelectedEntry } from '../state/guest-book.selectors';
import { closeAuthorPopup } from '../state/guest-book.actions';
import { AvatarService } from '../services/avatar.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-author-popup',
    templateUrl: './author-popup.component.html',
    styleUrls: ['./author-popup.component.scss'],
    imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
})
export class AuthorPopupComponent implements OnInit, OnDestroy {
    entry$ = this.store.select(selectSelectedEntry);
    avatarUrl = '';

    private subscription = new Subscription();

    constructor(
        private store: Store,
        private avatarService: AvatarService
    ) {
    }

    ngOnInit(): void {
        if (this.entry$ != undefined) {
            this.subscription.add(
                this.entry$.subscribe(entry => {
                    if (entry) {
                        this.avatarUrl = this.avatarService.getGravatarUrl(entry.email);
                    }
                }));
        }
    }

    closePopUp() {
        this.store.dispatch(closeAuthorPopup());
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}