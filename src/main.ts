import { bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { API_KEY } from './app/bootstrap/inits/api-key-loader/api-key-loader';
import { Config } from './app/bootstrap/inits/config-models';

fetch('/assets/config/config.json')
  .then((response) => response.json())
  .then((config: Config) => {
    const selectedApiKey = config.apiKeyConfig.selectedApiKey;

    platformBrowserDynamic([
      { provide: API_KEY, useValue: config.apiKeyConfig[selectedApiKey] },
    ]);
    bootstrapApplication(AppComponent, appConfig).catch((err) =>
      // eslint-disable-next-line no-console
      console.error(err)
    );
  });
