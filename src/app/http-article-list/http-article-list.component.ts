import { Component, OnInit, inject } from '@angular/core';
import { HttpArticleService } from '../services/http-article-service';
import { ArticleCardComponent } from '../article-card/article-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-http-article-list',
  standalone: true,
  imports: [ ArticleCardComponent, MatProgressSpinnerModule],
  templateUrl: './http-article-list.component.html',
  styleUrl: './http-article-list.component.scss'
})
export class HttpArticleListComponent implements OnInit {
  httpArticleService = inject(HttpArticleService)
  articles = this.httpArticleService.articles;
  loading =  this.httpArticleService.loading;
  error = this.httpArticleService.error;

  ngOnInit() {
    this.httpArticleService.getArticles();
  }
}