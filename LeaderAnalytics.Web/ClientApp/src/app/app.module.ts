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
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CachingComponent } from './products/caching/caching.component';


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
    CachingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
