import { ApplicationConfig } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { HttpClientModule, provideHttpClient, withFetch, HTTP_INTERCEPTORS } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatPaginator } from '@angular/material/paginator';
import { BookService, UserService, ThemeService } from '@app/service';
import { JwtInterceptor, ErrorInterceptor } from '@app/helpers';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withRouterConfig({onSameUrlNavigation: 'reload'})), 
    provideClientHydration(), 
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withFetch()),
    BookService, 
    MatPaginator, 
    UserService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    ThemeService]
};
