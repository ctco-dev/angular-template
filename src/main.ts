import {AppComponent} from './app/app.component';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideRouter} from '@angular/router';
import {provideHttpClient} from '@angular/common/http';
import {provideStore} from "@ngrx/store";
import {routes} from './app/routes';
import {provideEffects} from "@ngrx/effects";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {isDevMode} from "@angular/core";

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    provideRouter(routes),
    provideStore(),
    provideEffects(),
  ]
})
  .catch(err => console.error(err));
