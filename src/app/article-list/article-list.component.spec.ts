import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { ArticleListComponent } from './article-list.component';
import { ArticleService } from '../services/article-service';
import { By } from '@angular/platform-browser';

describe('ArticleListComponent', () => {
  let fixture: ComponentFixture<ArticleListComponent>;
  let component: ArticleListComponent;
  let service: ArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticleListComponent],
    });

    fixture = TestBed.createComponent(ArticleListComponent);
    component = fixture.componentInstance;
    service = component.service;
  });

  it('should show loading spinner initially', () => {
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('mat-spinner'));

    expect(spinner).toBeTruthy();
  });

  it('should show error message', () => {
    service.loading.set(false);
    service.error.set('Network failed!');

    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css('.error')).nativeElement;
    expect(error.textContent).toContain('Network failed!');
  });

  it('should show empty message when no articles', () => {
    service.loading.set(false);
    service.articles.set([]);

    fixture.detectChanges();

    const empty = fixture.debugElement.query(By.css('.empty')).nativeElement;
    expect(empty.textContent).toContain('No articles found.');
  });

  it('should render article cards when articles loaded', fakeAsync(() => {
    service.loading.set(false);
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('app-article-card'));
    expect(cards.length).toBe(service.articles().length);
  }));
});