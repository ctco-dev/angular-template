import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleListComponent } from './article-list.component';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ArticleService } from '../services/article.service';
import { signal } from '@angular/core';
import { Article } from '../models/article';
import { By } from '@angular/platform-browser';

const mockArticles: Article[] = [
  {
    title: 'Article 1',
    description: 'Description for article 1',
    picture: 'https://via.placeholder.com/150',
    publishDate: new Date(),
  },
  {
    title: 'Article 2',
    description: 'Description for article 2',
    picture: 'https://via.placeholder.com/150',
    publishDate: new Date(),
  },
];

describe('ArticleListComponent', () => {
  let component: ArticleListComponent;
  let fixture: ComponentFixture<ArticleListComponent>;
  let articleService: ArticleService;

  beforeEach(async () => {
    // Create a mock ArticleService with writable signals
    const articleServiceMock = {
      articles: signal<Article[]>([]),
      loading: signal<boolean>(false),
      error: signal<string | null>(null),
      getArticles: vi.fn(), // Mock the getArticles method
    };

    await TestBed.configureTestingModule({
      imports: [ArticleListComponent],
      providers: [{ provide: ArticleService, useValue: articleServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleListComponent);
    component = fixture.componentInstance;
    // Get the injected mock service
    articleService = TestBed.inject(ArticleService);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display a loading spinner when loading is true', () => {
    // Set loading to true in the mock service
    (articleService.loading as import('@angular/core').WritableSignal<boolean>).set(true);

    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinner).not.toBeNull();
  });

  it('should display an error message when error is not null', () => {
    const errorMessage = 'Failed to load articles';
    // Set error in the mock service
    (articleService.error as import('@angular/core').WritableSignal<string | null>).set(errorMessage);
    fixture.detectChanges();

    const errorElement = fixture.debugElement.query(By.css('.error-message'));
    expect(errorElement).not.toBeNull();
    expect(errorElement.nativeElement.textContent).toContain(errorMessage);
  });

  it('should display a list of articles when articles are loaded', () => {
    // Set articles in the mock service
     (articleService.articles as import('@angular/core').WritableSignal<Article[]>).set(mockArticles);

    fixture.detectChanges();

    const articleCards = fixture.debugElement.queryAll(By.css('app-card'));
    expect(articleCards.length).toBe(mockArticles.length);
  });

    it('should display a message when the article list is empty', () => {
    // Set articles in the mock service
     (articleService.articles as import('@angular/core').WritableSignal<Article[]>).set([]);

    fixture.detectChanges();

    const emptyMessage = fixture.debugElement.query(By.css('p'));
    expect(emptyMessage).not.toBeNull();
    var pp = emptyMessage.nativeElement.textContent.toString();
    expect(pp).toBe('No articles found.');
    const articleCards = fixture.debugElement.queryAll(By.css('app-card'));
    expect(articleCards.length).toBe(0);
  });
});
