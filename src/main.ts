import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app-routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { routerReducer, provideRouterStore } from '@ngrx/router-store';
import { environment } from './environments/environment.development';
import { provideStoreDevtools } from '@ngrx/store-devtools';

bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(appRoutes),
      provideHttpClient(withInterceptorsFromDi()),
      provideStore({
        router: routerReducer,
      }),
      provideRouterStore(),
      provideEffects(),
      provideStoreDevtools({
        maxAge: 25,
        logOnly: environment.production,
      }),
    ]
})
  .catch(err => console.error(err));
