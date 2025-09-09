import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function handleError({ status }: HttpErrorResponse) {
  return throwError(() => `${status}: An error occured.`);
}
