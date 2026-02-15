import { TestBed } from '@angular/core/testing';
import { GuestbookDialogService } from './guestbook-dialog.service';


describe('GuestbookDialogService', () => {
  let service: GuestbookDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestbookDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
