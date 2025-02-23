import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { routes } from './app.routes';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),provideRouter(routes), provideClientHydration(withEventReplay()), provideCharts(withDefaultRegisterables()), provideCharts(withDefaultRegisterables()), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient(), provideCharts(withDefaultRegisterables())]
};