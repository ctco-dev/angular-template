import { Routes } from '@angular/router';
import { PostPageComponent } from './post-page/post-page.component';
import { PostsPageComponent } from './posts-page/posts-page.component';

export const routes: Routes = [
  {
    path: '',
    component: PostsPageComponent,
  },
  {
    path: ':id',
    component: PostPageComponent,
  },
];
