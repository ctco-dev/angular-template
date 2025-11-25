import { Injectable, signal } from '@angular/core';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articles = signal<Article[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  constructor() {
    this.loadMockArticles();
  }

  private loadMockArticles() {
    // simulate API delay
    setTimeout(() => {
      try {
        const mockedData: Article[] = [
          {
            title: 'Angular Material Tutorial',
            description: 'Learn how to style components using Angular Material.',
            picture: 'https://picsum.photos/600/300',
            publishDate: new Date('2024-11-21'),
          },
          {
            title: 'Signals in Angular',
            description: 'Understanding reactive signals in Angular 17.',
            picture: 'https://picsum.photos/600/301',
            publishDate: new Date('2024-10-18'),
          }
        ];

        this.articles.set(mockedData);
        this.loading.set(false);
      } catch {
        this.error.set('Failed to load articles');
        this.loading.set(false);
      }
    }, 1000);
  }
}
