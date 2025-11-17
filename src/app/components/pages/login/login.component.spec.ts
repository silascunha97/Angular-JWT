import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth-service.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    fixture.detectChanges();
  });

  it('deve chamar login com os dados corretos', () => {
    component.loginForm.setValue({
      name: 'Teste',
      email: 'email@test.com',
      password: '123456'
    });

    // return a mocked User-like object (cast to any to satisfy the test) so the Observable<User> type matches
    authServiceSpy.login.and.returnValue(of({ username: 'Teste', password: '123456', token: 'abc' } as any));

    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith(
      jasmine.objectContaining({
        email: 'teste321@123teste.com.br',
        password: 'Teste@123456'
      })
    );
  });
});
