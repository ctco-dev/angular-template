import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { GuestBookEntry } from './guest-book.model';

@Injectable({
  providedIn: 'root',
})
export class GuestBookService {
  private entries: GuestBookEntry[] = [
    {
      id: 1,
      author: {
        name: 'Ava Thompson',
        email: 'ava.thompson@example.com',
      },
      message:
        'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.',
    },
    {
      id: 2,
      author: {
        name: 'William Clark',
        email: 'william.clark@example.com',
      },
      message:
        'Quisque velit nisi, pretium ut lacinia in, elementum id enim. Proin eget tortor risus.',
    },
    {
      id: 3,
      author: {
        name: 'Dmitrijs Savkins',
        email: 'dhmitry@gmail.com',
      },
      message:
        'Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
    },
    {
      id: 4,
      author: {
        name: 'William Clark',
        email: 'william.clark@example.com',
      },
      message: 'Nulla quis lorem ut libero malesuada feugiat.',
    },
    {
      id: 5,
      author: {
        name: 'James Hall',
        email: 'james.hall@example.com',
      },
      message:
        'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.',
    },
    {
      id: 6,
      author: {
        name: 'Isabella Walker',
        email: 'isabella.walker@example.com',
      },
      message: 'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.',
    },
    {
      id: 7,
      author: {
        name: 'Dmitrijs Savkins',
        email: 'dhmitry@gmail.com',
      },
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 8,
      author: {
        name: 'Dmitrijs Savkins',
        email: 'dhmitry@gmail.com',
      },
      message:
        'Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.',
    },
    {
      id: 9,
      author: {
        name: 'Dmitrijs Savkins',
        email: 'dhmitry@gmail.com',
      },
      message:
        'Vivamus suscipit tortor eget felis porttitor volutpat. Cras ultricies ligula sed magna dictum porta.',
    },
    {
      id: 10,
      author: {
        name: 'Ava Thompson',
        email: 'ava.thompson@example.com',
      },
      message:
        'Donec sollicitudin molestie malesuada. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Nulla porttitor accumsan tincidunt.',
    },
  ];

  getEntries(): Observable<GuestBookEntry[]> {
    return of(this.entries).pipe(delay(500));
  }

  save(entry: GuestBookEntry): Observable<GuestBookEntry> {
    const toSave: GuestBookEntry = {
      ...entry,
      id: Math.max(...this.entries.map((x) => x.id ?? 0)) + 1,
    };

    this.entries = [...this.entries, toSave];
    return of(toSave).pipe(delay(500));
  }
}
