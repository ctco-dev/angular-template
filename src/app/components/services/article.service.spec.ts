import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ArticleService } from './article.service';
import { beforeEach, describe, expect, it } from 'vitest';

describe('ArticleService', () => {
  let service: ArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load articles asynchronously', fakeAsync(() => {
    expect(service.loading()).toBe(true);
    tick(1500);
    expect(service.loading()).toBe(false);
    expect(service.articles().length).toBe(3);
  }));
});
