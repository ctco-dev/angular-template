import { Routes } from '@angular/router';
import { HttpArticleListComponent } from './http-article-list/http-article-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';


export const appRoutes: Routes = [
   { path: 'article/:id', component: ArticleDetailsComponent },
  
    {
    path: '',
    component: HttpArticleListComponent  
  },
  {
    path: '**',       
    component: NotFoundComponent
  },
//    { path: 'article/:id', component: ArticleDetailsComponent },

  { path: '**', redirectTo: '' }
];