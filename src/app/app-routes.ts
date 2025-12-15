import { Routes } from '@angular/router';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const appRoutes: Routes = [
    { path: "articles/:id", component: ArticleDetailsComponent },
    { path: "articles", component: ArticleListComponent },
    { path: "", component: ArticleListComponent },
    { path: '**', component: NotFoundComponent }
];
