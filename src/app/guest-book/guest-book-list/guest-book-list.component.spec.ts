import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestBookAuthor } from '../guest-book.model';
import { GuestBookListComponent } from './guest-book-list.component';

describe('GuestBookListComponent', () => {
  let component: GuestBookListComponent;
  let fixture: ComponentFixture<GuestBookListComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [GuestBookListComponent],
    });

    fixture = TestBed.createComponent(GuestBookListComponent);
    component = fixture.componentInstance;
  });

  it('should emit authorClicked with the provided author on click', () => {
    const author: GuestBookAuthor = {
      name: 'Test User',
      email: 'test@example.com',
    };
    spyOn(component.authorClicked, 'emit');

    component.onClick(author);

    expect(component.authorClicked.emit).toHaveBeenCalledWith(author);
  });
});
