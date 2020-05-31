import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdaptiveClientComponent } from './products/adaptive-client/adaptive-client.component';
import { CachingComponent } from './products/caching/caching.component';
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



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'apps/adaptiveclient', component: AdaptiveClientComponent },
  { path: 'apps/caching', component: CachingComponent },
  { path: 'apps/renewals', component: RenewalsComponent },
  { path: 'apps/vyntix', component: VyntixComponent },
  { path: 'apps/vyntix-downloader', component: VyntixDownloaderComponent },
  { path: 'apps/vyntix-fred-client', component: VyntixFredClientComponent },
  { path: 'support/community', component: CommunityComponent },
  { path: 'support/documentation', component: DocumentationComponent },
  { path: 'support/downloads', component: DownloadsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
