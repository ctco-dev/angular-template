import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GuestbookAuthorComponent } from './guestbook-author.component';
import { Author } from 'src/app/models/author.model';

describe('GuestbookAuthorComponent', () => {
  let component: GuestbookAuthorComponent;
  let fixture: ComponentFixture<GuestbookAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestbookAuthorComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestbookAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    const mockAuthor: Author = { name: 'John', email: 'john@' };
    
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [GuestbookAuthorComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockAuthor }
      ]
    });

    const testFixture = TestBed.createComponent(GuestbookAuthorComponent);
    const testComponent = testFixture.componentInstance;

    expect(testComponent.authorName()).toBe('John');
    expect(testComponent.email()).toBe('john@');
  });
});
