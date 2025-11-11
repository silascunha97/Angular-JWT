import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { RegisterRequest } from '../interfaces/register-request';
import { LoginRequest } from '../interfaces/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthServices {
  

private apiUrl = 'http://localhost:5254/api/Auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      this.currentUserSubject.next(JSON.parse(userJson));
    }
  }

  // 🔐 Login
   login(credentials: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // ✅ Verifica se está autenticado
  isAuthenticated(): Observable<boolean> {
    alert('isAuthenticated called');
    return this.currentUserSubject.asObservable().pipe(
      map(user => !!user)
    );
  }

  // 🚪 Logout
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // 👤 Getter para o usuário atual
  get currentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }
}
