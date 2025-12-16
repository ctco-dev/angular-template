import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Article } from '../models/article';
import { HttpClient } from '@angular/common/http';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  public articles = signal<Article[]>([]);
  public article = signal<Article | null>(null);
  public loading = signal<boolean>(false);
  public error = signal<string | null>(null);
  private readonly httpClient = inject(HttpClient);

  getArticles() {
    this.loading.set(true);
    this.httpClient.get<Article[]>('/assets/articles.json').subscribe({
      next: (data: any) => {
        this.articles.set(data);
        this.error.set(null);
      },
      error: (err) => {
        this.error.set('Failed to load articles');
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }

  getArticleById(id: number) {
    this.loading.set(true);
    this.httpClient.get<Article[]>('/assets/articles.json')
    .pipe(
      map(articles => articles.find(article => article.id === id)))
   .subscribe({
      next: (data) => {
        this.article.set(data ?? null);
        this.error.set(null);
      },
      error: (err) => {
        this.error.set('Failed to load article');
      },
      complete: () => {
        this.loading.set(false);
      }
    });

  }
}
