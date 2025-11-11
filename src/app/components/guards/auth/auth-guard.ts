import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthServices } from '../../services/auth-services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthServices, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isAuthenticated().pipe(
      take(1),
      map(isAuth => {
        if (isAuth) {
          return true;
        }
        // Redireciona para a página de login se não estiver autenticado
        return this.router.createUrlTree(['/login']);
      })
    );
  }
}
