import { Injectable, signal } from '@angular/core';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  public articles = signal<Article[]>([]);
  public loading = signal<boolean>(false);
  public error = signal<string | null>(null);

  constructor() {
    this.getArticles();
  }

  getArticles() {
    this.loading.set(true);

    setTimeout(() => {
      try {
        this.articles.set([
          {
            title: 'Article 1',
            description: 'Description for article 1',
            picture: 'https://material.angular.dev/assets/img/examples/shiba2.jpg',
            publishDate: new Date()
          },
          {
            title: 'Article 2',
            description: 'Description for article 2',
            picture: 'https://material.angular.dev/assets/img/examples/shiba2.jpg',
            publishDate: new Date()
          },
          {
            title: 'Article 3',
            description: 'Description for article 3',
            picture: 'https://material.angular.dev/assets/img/examples/shiba2.jpg',
            publishDate: new Date()
          }
        ]);
        //throw new Error("Division by zero is not allowed");
      } catch {
        this.error.set('Failed to load articles');
      } finally {
        this.loading.set(false);
      }
    }, 1500);


  }
}
