import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../models/article';
import {  catchError, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpArticleService {

  articles = signal<Article[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  getArticles(): void {
    this.loading.set(true);
    this.error.set(null);

     this.http.get<Article[]>('assets/data/articles.json').pipe(
      tap(() => this.loading.set(false)),
      catchError(err => {
        console.error(err);
        this.loading.set(false);
        this.error.set('Failed to load articles');
        return of([]); // return empty array on error
      })
    ).subscribe(data => {
      this.articles.set(data);
      this.loading.set(false);
    });
  }
}
