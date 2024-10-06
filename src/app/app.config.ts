import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api';
import { provideMarkdown } from 'ngx-markdown';

const initializeAppFactory = (primeConfig: PrimeNGConfig) => () => {
  primeConfig.ripple = true;
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideAnimations(), provideHttpClient(), provideMarkdown(), {
    provide: APP_INITIALIZER,
    useFactory: initializeAppFactory,
    deps: [PrimeNGConfig],
    multi: true
  }],
};
