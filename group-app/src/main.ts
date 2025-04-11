import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ColorGenerationComponent } from './app/color-generation/color-generation.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  bootstrapApplication(ColorGenerationComponent)
  .catch(err => console.error(err));
