import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routes';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideStore({
      router: routerReducer,
    }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production
    }),
    provideRouterStore(),
    provideRouter(routes),
  ]
})
  .catch(err => console.error(err));
