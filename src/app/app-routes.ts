import { Routes } from '@angular/router';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { GuestBookListComponent } from './guestBook/guest-book-list/guest-book-list.component';

export const appRoutes: Routes = [
    { path: 'posts', component: PostsListComponent },
    { path: 'guest-book', component: GuestBookListComponent },
    //{ path: '' }
];
