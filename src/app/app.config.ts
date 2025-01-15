import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; 
import { routes } from './app.routes';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthService } from './auth/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(withInterceptorsFromDi()),
    provideAppInitializer(() => {
      const auth = inject(AuthService);
      return auth.initialize()
    }),
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ]
};
