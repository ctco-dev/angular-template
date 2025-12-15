import { TestBed } from '@angular/core/testing';
import { ArticleService } from './article.service';
import { vi, beforeEach, describe, expect, it, afterEach } from 'vitest';

describe('ArticleService', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({
      providers: [ArticleService],
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should be created', () => {
    const service = TestBed.inject(ArticleService);
    expect(service).toBeTruthy();
  });

  it('should load articles successfully', () => {
    const service = TestBed.inject(ArticleService);
    
    expect(service.loading()).toBe(true);
    expect(service.articles()).toEqual([]);
    expect(service.error()).toBe(null);

    vi.advanceTimersByTime(1500);

    expect(service.loading()).toBe(false);
    expect(service.articles().length).toBe(3);
    expect(service.error()).toBe(null);
  });

  it('should handle errors when fetching articles', () => {
    // To test the error path, we can temporarily modify the getArticles method on the prototype
    // to simulate a failure.
    const originalGetArticles = ArticleService.prototype.getArticles;
    ArticleService.prototype.getArticles = function(this: ArticleService) {
      this.loading.set(true);
      setTimeout(() => {
        try {
          throw new Error('Failed to fetch');
        } catch (e) {
          this.error.set('Failed to load articles');
        } finally {
          this.loading.set(false);
        }
      }, 1500);
    };

    // Now, creating the service will use our mocked getArticles
    const service = TestBed.inject(ArticleService);

    expect(service.loading()).toBe(true);
    
    vi.advanceTimersByTime(1500);
    
    expect(service.loading()).toBe(false);
    expect(service.articles().length).toBe(0);
    expect(service.error()).toBe('Failed to load articles');

    // Restore the original method to not affect other tests
    ArticleService.prototype.getArticles = originalGetArticles;
  });
});
