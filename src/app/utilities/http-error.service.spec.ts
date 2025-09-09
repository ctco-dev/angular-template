import { TestBed } from '@angular/core/testing';

import { HttpErrorService } from './http-error.service';
import { HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';

describe('HttpErrorService', () => {
  let service: HttpErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpErrorService);
  });

  it('should be correctly format error message', () => {
    // arrange
    const input: HttpErrorResponse = {
      error: {},
      status: 400,
      statusText: "Some text",
      name: 'HttpErrorResponse',
      message: 'Error occured',
      ok: false,
      headers: {} as HttpHeaders,
      url:'',
      type: HttpEventType.Response,
    };
    // act
    const result = service.formatError(input);

    // assert
    expect(result).toBe(`Server returned code: ${input.status}, error message is: ${input.statusText}`);
  });
});
