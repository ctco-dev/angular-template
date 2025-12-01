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
            title: 'Services in Angular',
            description: 'Learn how to use services and mock data.',
            picture: 'https://picsum.photos/600/300',
            publishDate: new Date('2025-11-26'),
          },
          {
            title: 'Signals in Angular',
            description: 'Understanding reactive signals in Angular 17.',
            picture: 'https://picsum.photos/600/301',
            publishDate: new Date('2025-10-18'),
          },
            {
            title: 'Reactive Programming',
            description: 'Understanding reactive prohtamming in Angular 17.',
            picture: 'https://picsum.photos/600/302',
            publishDate: new Date('2025-10-20'),
          },
            {
            title: 'Decimals in Angular',
            description: 'Understanding decimals in Angular 17.',
            picture: 'https://picsum.photos/600/303',
            publishDate: new Date('2025-10-21'),
          },
            {
            title: 'Homework in Angular',
            description: 'How to use chat GPT.',
            picture: 'https://picsum.photos/600/304',
            publishDate: new Date('2025-10-22'),
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
