import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BlogCommentComponent } from './blog-comment.component';

describe('BlogCommentComponent', () => {
  let component: BlogCommentComponent;
  let fixture: ComponentFixture<BlogCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BlogCommentComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => '1' })
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
