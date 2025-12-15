import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleDetailsComponent } from './article-details.component';
import { ActivatedRoute } from '@angular/router';
import { HttpArticleService } from '../services/http-article-service';
import { vi } from 'vitest';
import { signal } from '@angular/core';

describe('ArticleDetailsComponent (Vitest)', () => {
  let component: ArticleDetailsComponent;
  let fixture: ComponentFixture<ArticleDetailsComponent>;

   const mockArticles = [
    { id: 1, title: 'Test Article', description: 'Desc', picture: '', publishDate: '2024-01-01' }
  ];

  const mockArticleService = {
    articles: signal(mockArticles),
    getArticles: vi.fn()   // ← Vitest spy
  };
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleDetailsComponent],
      providers: [
        { 
          provide: ActivatedRoute, 
          useValue: {
            snapshot: { paramMap: new Map([['id', '1']]) }
          } 
        },
        {
          provide: HttpArticleService,
          useValue: mockArticleService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read article from service', () => {
    expect(component.article()).toEqual(mockArticles[0]);
  });
});
