import { Injectable } from '@angular/core';
import { IMessage } from './message.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  readonly guestMessages$ = this.http.get<IMessage[]>('/api/guest-comments');

  constructor(private http: HttpClient) { }

  postMessage(message: IMessage) {
    return this.http.post<IMessage>('/api/guest-comments', message);
  }
}
