import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      const clonedRequest = req.clone({
        setHeaders: { Authorization: `Token ${savedToken}` },
      });
      return handler.handle(clonedRequest);
    }
    return handler.handle(req);
  }
}
