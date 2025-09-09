import { Routes } from "@angular/router";
import { PostsPageComponent } from "./posts-page/posts-page.component";
import { PostDetailsComponent } from "./post-details/post-details.component";

export const routes: Routes = [
  {
    path: '',
    component: PostsPageComponent,
  },
  {
    path: ':id',
    component: PostDetailsComponent,
  },
];
