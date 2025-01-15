import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.getCurrentUser().pipe(
      map((user) => {
        if (user) {
          return true; // Пользователь авторизован
        } else {
          console.log("пользователь не найден, редирект на логин");
          return this.router.createUrlTree(['/login']); // Перенаправление на страницу авторизации
        }
      })
    );
  }
}