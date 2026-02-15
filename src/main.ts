import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app-routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { postsReducer } from './app/features/blog-posts/state/posts.reducer';
import { PostsEffects } from './app/features/blog-posts/state/posts.effects';
import { guestBookReducer } from './app/features/guest-page/state/guest-book.reducer';
import { GuestBookEffects } from './app/features/guest-page/state/guest-book.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(appRoutes),
    provideStore({ posts: postsReducer, guestBook: guestBookReducer }),
    provideEffects([PostsEffects, GuestBookEffects]),
    provideRouterStore()
  ]
})
  .catch(err => console.error(err));
