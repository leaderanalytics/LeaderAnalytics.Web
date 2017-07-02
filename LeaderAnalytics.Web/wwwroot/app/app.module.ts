import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SiteNavBar } from './site-nav-bar.component';

@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent, SiteNavBar],
    bootstrap: [AppComponent]
})
export class AppModule { }