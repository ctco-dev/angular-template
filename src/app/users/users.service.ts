import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpErrorService } from '../utilities/http-error.service';
import { catchError } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = environment.blogApiUrl + '/users';

  constructor(
    private http: HttpClient,
    private errorHandler: HttpErrorService,
  ) {}

    getAll() {
      return this.http
        .get<User[]>(this.usersUrl)
        .pipe(catchError(this.errorHandler.handleError));
    }

    getById(id: number) {
      return this.http
        .get<User>(`${this.usersUrl}/${id}`)
        .pipe(catchError(this.errorHandler.handleError));
    }
}
