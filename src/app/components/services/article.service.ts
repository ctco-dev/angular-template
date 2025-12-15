import { inject, Injectable, signal } from '@angular/core';
import { Article } from '../models/article';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  public articles = signal<Article[]>([]);
  public loading = signal<boolean>(false);
  public error = signal<string | null>(null);
  private readonly httpClient = inject(HttpClient);

  getArticles() {
    this.loading.set(true);
    this.httpClient.get('/assets/articles.json').subscribe({
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
}
