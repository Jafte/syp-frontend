import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError, switchMap, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../user/user.model';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { WebAppService } from '../webapp.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private userSubject = new BehaviorSubject<User | null>(null);
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router, private userService: UserService, private webAppService: WebAppService) {}

  initialize(): Promise<void> {
    console.log('Инициализация приложения началась');
    return new Promise((resolve) => {
      const savedToken = localStorage.getItem('authToken');
      const userData = this.webAppService.getAppInitData();
      console.log('userData', userData);
      if (savedToken) {
        this.tokenSubject.next(savedToken);
        this.loadCurrentUser().subscribe({
          next: () => {
            console.log('Пользователь успешно восстановлен.');
            resolve();
          },
          error: () => {
            console.log('Пользователь не восстановлен из-за ошибки');
            resolve();
          },
        });
      } else {
        console.log('Токен не найден');
        if (userData) {
          this.tgLogin(userData).subscribe({
            next: (user) => {
              console.log('Авторизация успешна!', user);
              this.router.navigate(['/user/profile']);
              resolve();
            },
            error: (err) => {
              console.log('Пользователь не восстановлен из-за ошибки', err.message);
              resolve();
            },
          });
        } else {
          console.log('Где мы?');
          resolve();
        }
      }
    });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login/`, { "username": username, "password": password }).pipe(
      catchError(this.handleError),
      switchMap((response) => {
        this.setToken(response.token);
        return this.loadCurrentUser().pipe(
          map((user: User) => {
            return user;
          })
        );
      }),
    );
  }

  tgLogin(user_data: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/telegram/`, {"user_data": user_data}).pipe(
      catchError(this.handleError),
      switchMap((response) => {
        this.setToken(response.token);
        return this.loadCurrentUser().pipe(
          map((user: User) => {
            return user;
          })
        );
      }),
    );
  }

  private setToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.tokenSubject.next(token);
  }

  private loadCurrentUser(): Observable<User> {
    return this.userService.getCurrentUser().pipe(
      map((user) => {
        this.userSubject.next(user);
        return user;
      })
    )
  }

  getCurrentUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  logout(logoutall: boolean): Observable<any> {
    let logout_url = "/auth/logout/";
    if (logoutall) {
      logout_url = "/auth/logoutall/"
    }
    return this.http.post<null>(`${this.apiUrl}${logout_url}`, null).pipe(
      catchError(this.handleError),
      map((response) => {
        localStorage.removeItem('authToken');
        this.tokenSubject.next(null);
        this.userSubject.next(null);
      }),
      map(() => {
        this.router.navigate(['']);
      })
    );
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(error);
    let message_text = 'Ошибка сервера';
    if (error.status == 400) {
      message_text = "Данные для входа не верны, проверье логин и пароль";
    }
    // Обработайте ошибку
    return throwError(() => new Error(message_text));
  }
}
