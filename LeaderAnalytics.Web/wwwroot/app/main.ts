import 'zone.js';  // must be FIRST
import 'reflect-metadata'; // must be SECOND
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
platformBrowserDynamic().bootstrapModule(AppModule);
