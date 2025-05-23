import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app-routes";
import { MAT_ICON_DEFAULT_OPTIONS } from "@angular/material/icon";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
  { provide: MAT_ICON_DEFAULT_OPTIONS,
    useValue: {
        fontSet: "material-symbols-outlined",
    }
  }
]
};