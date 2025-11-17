import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/components/routing/usuer-rounting/usuer-rounting-routing.module';

bootstrapApplication(AppComponent, 
  { 
    ...appConfig, 
    providers: [
      provideRouter(routes),
      provideRouter(routes),
      provideHttpClient()
    ] 
  })
  .catch((err: unknown) => console.error(err));
