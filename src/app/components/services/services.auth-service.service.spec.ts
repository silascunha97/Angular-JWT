import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth-service.service';
import { LoginRequest } from '../interfaces/LoginRequest';

describe('AuthServiceService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });




//it('deve fazer login e armazenar o usuário na sessionStorage', (done: DoneFn) => {
//    const mockCredentials: any = { email: 'email@test.com', password: '123456', name: 'Test User' };
//    const mockUser = { id: 1, name: 'Test User', email: 'email@test.com' };
//
//    service.login(mockCredentials).subscribe((user) => {
//      expect(user).toEqual(mockUser);
//      expect(sessionStorage.getItem('currentUser')).toBeTruthy();
//      done();
//    });
//  });

});
