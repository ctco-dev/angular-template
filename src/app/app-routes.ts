import { Routes } from '@angular/router';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';

export const appRoutes: Routes = [
    { path: "", component: ArticleListComponent },
    { path: "articles", component: ArticleListComponent },
    { path: "articles/:id", component: ArticleDetailsComponent },
];
