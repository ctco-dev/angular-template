import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AvatarService } from '../../../services/avatar.service';
import { GuestEntry } from 'src/app/models/guest-entry.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-author-popup',
    templateUrl: './author-popup.component.html',
    imports: [CommonModule]
})
export class AuthorPopupComponent implements OnInit {
    @Input() entry: GuestEntry | null | undefined;
    @Output()
    close: EventEmitter<number> = new EventEmitter<number>();
    avatarUrl = '';

    constructor(private avatarService: AvatarService) { }

    ngOnInit() {
        if (this.entry != undefined) {
            this.avatarUrl = this.avatarService.getGravatarUrl(this.entry.email);
        }
    }

    closePopUp() {
        this.close.emit(1);
    }
}