import { TestBed } from '@angular/core/testing';

import { GuestbookAuthorDialogService } from './guestbook-author-dialog.service';

describe('GuestbookAuthorDialogService', () => {
  let service: GuestbookAuthorDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestbookAuthorDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
