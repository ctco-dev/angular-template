import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { firstValueFrom } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

describe('UserService', () => {
  let service: UsersService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });

    service = TestBed.inject(UsersService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
  });

  it('getAll should return expected USERS', (done) => {
    // arrange
    let response$ = service.getAll();
    let reponsePromise = firstValueFrom(response$);

    const request = http.expectOne({
      url: environment.blogApiUrl + '/users',
      method: 'get'
    });
    const defaultUsers: User[] = [{id:1, email:'email', name:'some name', username: 'some username'}];
    request.flush(defaultUsers);

    // act
    // assert
    reponsePromise.then((value) => {
      expect(value).toEqual(defaultUsers);
      done();
    })
    .catch(done);
  });
});
