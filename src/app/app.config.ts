import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation(), withViewTransitions({
      skipInitialTransition: true,
      onViewTransitionCreated(transitionInfo) {
        // console.log ('View transition created:', transitionInfo);
      },
    })),
    // importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptorsFromDi())
  ]
};
