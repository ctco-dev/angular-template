import { Component, inject, OnInit, Signal } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { AppCardComponent } from "../app-card/app-card.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-article-list',
  imports: [AppCardComponent, MatProgressSpinnerModule],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss'
})
export class ArticleListComponent implements OnInit {
        
        private articleService = inject(ArticleService);
        protected articles = this.articleService.articles;
        protected loading = this.articleService.loading;
        protected error = this.articleService.error;
        
        ngOnInit(): void {
          this.articleService.getArticles();
        }
}
