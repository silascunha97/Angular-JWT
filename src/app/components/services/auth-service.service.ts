import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user-interfaces';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { api } from '../env/api';
import { map, Observable, tap } from 'rxjs';
import { LoginRequest } from '../interfaces/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // `BehaviorSubject` guarda o estado atual do usuário.
  // Ele sempre contém o último valor emitido.
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private httpClient: HttpClient) {

    // Verifica se existe um usuário salvo na sessão do navegador.
    const userJson = sessionStorage.getItem('currentUser');

    if (userJson) {
      // Se existir, restaura o usuário no BehaviorSubject.
      this.currentUserSubject.next(JSON.parse(userJson));
    }
  }

  login(credentials: LoginRequest): Observable<User> {
    
    // Faz a requisição HTTP POST para o endpoint de login.
    return this.httpClient.post(api.Url + 'login', {
      email: credentials.email,
      password: credentials.password
    }).pipe(

      // `tap` executa ações sem modificar o fluxo.
      tap((response: any) => {

        // A API deve retornar: username, password (opcional) e token.
        const user: User = {
          username: response.username,
          password: response.password,
          token: response.token
        };

        // Atualiza o estado global do usuário autenticado.
        this.currentUserSubject.next(user);

        // Salva o usuário na sessão.
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        sessionStorage.setItem('AuthToken', JSON.stringify(user.token));
        this.isAutenticated();
        // ----------------------------------------------------------
        // MOMENTO EXATO DA REQUISIÇÃO DE LOGIN
        // Exibe o token retornado pela API no console.
        // ----------------------------------------------------------
        //console.log('🔐 Token recebido no login:', user.token);
      })
    );
  }

  register(data: { username: string; password: string }): Observable<User> {

    // Faz requisição de registro.
    return this.httpClient.post<User>(api.Url + 'register', {
      username: data.username,
      password: data.password
    });
  }

  isAutenticated(): Observable<boolean> {

    // Retorna um Observable<boolean> que notifica mudanças no token.
    return this.currentUserSubject.asObservable()
      .pipe(map(user => !!user.token));
  }

  logout(): void {

    // Reseta o usuário e remove da sessão.
    //this.currentUserSubject.next({} as User);
    sessionStorage.removeItem('currentUser');

    sessionStorage.removeItem('AuthToken');
    sessionStorage.removeItem('user');
    this.isAuthenticatedSubject.next(false);
  }

  get currentUserValue(): Observable<User> {

    // Retorna o Observable do BehaviorSubject.
    return this.currentUserSubject.asObservable();
  }
  hasToken(): boolean {
    return !!sessionStorage.getItem('AuthToken');
  }
}
