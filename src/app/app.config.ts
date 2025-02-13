import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { xApiKeyInterceptor } from './bootstrap/interceptors/x-api-key-header';

import { HammerModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Aura from '@primeng/themes/aura';
import 'hammerjs';
import { providePrimeNG } from 'primeng/config';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HammerModule),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([xApiKeyInterceptor])),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
};
