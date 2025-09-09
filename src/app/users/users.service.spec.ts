import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { User } from './user.model';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let http: HttpTestingController;
  let service: UsersService;

  let DEFAULT_USERS: User[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    http = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UsersService);

    DEFAULT_USERS = [
      {
        id: 1,
        name: 'Test User 1',
      },
      {
        id: 2,
        name: 'Test User 2',
      },
    ];
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should return users array from getUsers', async () => {
    const users$ = service.getUsers();
    const usersPromise = firstValueFrom(users$);

    const req = http.expectOne({
      url: 'https://jsonplaceholder.typicode.com/users',
      method: 'GET',
    });
    req.flush(DEFAULT_USERS);

    expect(await usersPromise).toEqual(DEFAULT_USERS);
  });

  it('should return expected URL from getAvatarUrl', async () => {
    const email = 'user@example.com';

    const avatarUrl$ = service.getAvatarUrl(email);

    expect(await firstValueFrom(avatarUrl$)).toBe(
      'https://0.gravatar.com/avatar/b4c9a289323b21a01c3e940f150eb9b8c542587f1abfd8f0e1cc1ffc5e475514?size=256&d=wavatar',
    );
  });
});
