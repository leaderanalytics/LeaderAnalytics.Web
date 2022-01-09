import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdaptiveClientComponent } from './products/adaptive-client/adaptive-client.component';
import { CommunityComponent } from './support/community/community.component';
import { ContactComponent } from './contact/contact.component';
import { DialogsComponent } from './dialogs/dialogs.component';
import { DocumentationComponent } from './support/documentation/documentation.component';
import { DownloadsComponent } from './support/downloads/downloads.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RenewalsComponent } from './products/renewals/renewals.component';
import { VyntixComponent } from './products/vyntix/vyntix.component';
import { VyntixDownloaderComponent } from './products/vyntix-downloader/vyntix-downloader.component';
import { VyntixFredClientComponent } from './products/vyntix-fred-client/vyntix-fred-client.component';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CachingComponent } from './products/caching/caching.component';
import { ProfileComponent } from './profile/profile.component';
import { MsalGuard, MsalInterceptor, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular';
import { MSALInstanceFactory, apiConfig } from '../environments/msal-config';
import { InteractionType, LogLevel } from '@azure/msal-browser';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}


export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(apiConfig.uri, apiConfig.scopes);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [...apiConfig.scopes],
    },
    loginFailedRoute: 'login-failed'
  };
}

@NgModule({
  declarations: [
    AppComponent,
    AdaptiveClientComponent,
    RenewalsComponent,
    VyntixComponent,
    VyntixDownloaderComponent,
    VyntixFredClientComponent,
    CommunityComponent,
    DocumentationComponent,
    DownloadsComponent,
    DialogsComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    HomeComponent,
    LoginComponent,
    CachingComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'Cookie',
      headerName: 'CookieHeader'
    }),
    MsalModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
