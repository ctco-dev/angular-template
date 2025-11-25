import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleCardComponent } from './article-card.component';

describe('ArticleCardComponent', () => {
  let component: ArticleCardComponent;
  let fixture: ComponentFixture<ArticleCardComponent>;

  const mockArticle = {
    title: 'Test Title',
    description: 'Test Description',
    picture: 'test.jpg',
    publishDate: new Date('2024-11-21'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleCardComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('article', mockArticle);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const titleEl: HTMLElement = fixture.nativeElement.querySelector('mat-card-title');
    expect(titleEl.textContent?.trim()).toBe(mockArticle.title);
  });

  it('should render the description', () => {
    const descEl = fixture.nativeElement.querySelector('mat-card-content p');
    expect(descEl.textContent?.trim()).toBe(mockArticle.description);
  });

  it('should render the picture src', () => {
    const imgEl: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(imgEl.src).toContain(mockArticle.picture);
  });

  it('should render the published date', () => {
    const dateEl = fixture.nativeElement.querySelector('small');

    // Angular date pipe output for 2024-11-21
    const expectedDate = 'Nov 21, 2024'; // locale-dependent
    expect(dateEl.textContent?.trim()).toContain(expectedDate);
  });
});
