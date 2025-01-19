import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { FriendshipRequest, User, UserDetail } from '../user/user.model';
import { UserEvent } from './events/events.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<UserDetail> {
    return this.http.get<UserDetail>(`${this.apiUrl}/user/me/`).pipe(
      catchError(this.handleError),
      map((user) => {
        return user;
      })
    );
  }

  getUser(userUUId: string): Observable<UserDetail> {
    return this.http.get<UserDetail>(`${this.apiUrl}/user/${userUUId}/`).pipe(
      catchError(this.handleError),
      map((user) => {
        return user;
      })
    );
  }

  removeUserFromFriends(userUUId: string): Observable<UserDetail> {
    return this.http.post<UserDetail>(`${this.apiUrl}/user/${userUUId}/`, {"action": "remove_from_friends"}).pipe(
      catchError(this.handleError),
      map((user) => {
        return user;
      })
    );
  }

  sendFriendRequestToUser(userUUId: string, message: string | null = null): Observable<UserDetail> {
    return this.http.post<UserDetail>(`${this.apiUrl}/user/${userUUId}/`, {"action": "send_request", "message": message}).pipe(
      catchError(this.handleError),
      map((user) => {
        return user;
      })
    );
  }

  acceptUserFriendRequest(userUUId: string): Observable<UserDetail> {
    return this.http.post<UserDetail>(`${this.apiUrl}/user/${userUUId}/`, {"action": "accept_request"}).pipe(
      catchError(this.handleError),
      map((user) => {
        return user;
      })
    );
  }

  rejectUserFriendRequest(userUUId: string): Observable<UserDetail> {
    return this.http.post<UserDetail>(`${this.apiUrl}/user/${userUUId}/`, {"action": "reject_request"}).pipe(
      catchError(this.handleError),
      map((user) => {
        return user;
      })
    );
  }

  cancelFriendRequestToUser(userUUId: string): Observable<UserDetail> {
    return this.http.post<UserDetail>(`${this.apiUrl}/user/${userUUId}/`, {"action": "cancel_request"}).pipe(
      catchError(this.handleError),
      map((user) => {
        return user;
      })
    );
  }

  getFriends(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.apiUrl}/user/friends/`).pipe(
      catchError(this.handleError),
      map((users_list) => {
        return users_list;
      })
    );
  }

  getFriendRequests(): Observable<Array<FriendshipRequest>> {
    return this.http.get<Array<FriendshipRequest>>(`${this.apiUrl}/user/friends/requests/`).pipe(
      catchError(this.handleError),
      map((request_list) => {
        return request_list;
      })
    );
  }

  getUserEvents(): Observable<Array<UserEvent>> {
    return this.http.get<Array<UserEvent>>(`${this.apiUrl}/user/events/`).pipe(
      catchError(this.handleError),
      map((events_list) => {
        return events_list;
      })
    );
  }

  createUserEvent(
    title: string, 
    description: string, 
    started_at: Date | null, 
    ended_at: Date | null, 
    location: string | null
  ): Observable<UserEvent> {
    return this.http.post<UserEvent>(`${this.apiUrl}/user/events/add/`, {
      'title': title,
      'description': description,
      'started_at': started_at,
      'ended_at': ended_at,
      'location': location
    }).pipe(
      catchError(this.handleError),
      map((event) => {
        return event;
      })
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(error);
    let message_text = 'Ошибка сервера';
    if (error.status == 400) {
      message_text = 'Ошибка данных';
    }
    // Обработайте ошибку
    return throwError(() => new Error(message_text));
  }
}