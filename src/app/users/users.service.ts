import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, from, map, Observable } from 'rxjs';
import { handleError } from '../utils/http';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersUrl = 'https://jsonplaceholder.typicode.com/users';
  private http = inject(HttpClient);

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl).pipe(catchError(handleError));
  }

  getAvatarUrl(email: string): Observable<string> {
    return from(this.getGravatarHash(email)).pipe(
      map((hash) => {
        return `https://0.gravatar.com/avatar/${hash}?size=256&d=wavatar`;
      }),
    );
  }

  private async getGravatarHash(email: string): Promise<string> {
    const cleanEmail = email.trim().toLowerCase();

    const encoder = new TextEncoder();
    const data = encoder.encode(cleanEmail);

    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    return hashHex;
  }
}
