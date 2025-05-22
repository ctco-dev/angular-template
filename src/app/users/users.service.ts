import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersUrl = 'https://jsonplaceholder.typicode.com/users';
  constructor() {}
  private http = inject(HttpClient);

  getUsers() {
    return this.http
      .get<User[]>(this.usersUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError({ status }: HttpErrorResponse) {
    // TODO: unify error handling
    return throwError(() => `${status}: An error occured.`);
  }
}
