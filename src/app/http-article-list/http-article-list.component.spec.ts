import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpArticleListComponent } from './http-article-list.component';
import { HttpArticleService } from '../services/http-article-service';
import { signal } from '@angular/core';

class MockHttpArticleService {
  articles = signal([]);
  loading = signal(false);
  error = signal(null);
  getArticles() {}
}

describe('HttpArticleListComponent', () => {
  let component: HttpArticleListComponent;
  let fixture: ComponentFixture<HttpArticleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpArticleListComponent],
      providers: [
        { provide: HttpArticleService, useClass: MockHttpArticleService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HttpArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});