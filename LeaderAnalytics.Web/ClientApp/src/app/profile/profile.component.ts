import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventMessage, EventType, InteractionType, InteractionStatus, PopupRequest, RedirectRequest, AuthenticationResult, AuthError, AccountInfo } from '@azure/msal-browser';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { apiConfig } from '../../environments/msal-config';
import { Subject } from 'rxjs';
import { UserProfile } from '../model/model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  Profile: UserProfile;
  

  constructor(private http: HttpClient, private authService: MsalService,)
  {
    this.Profile = new UserProfile();
  }

  ngOnInit(): void {
    const url = apiConfig.uri + 'api/status/SecureIdentity';
    this.http.get(url).subscribe(response => {
      this.Profile.API_Verified = response.toString();
      let activeAccount: AccountInfo = this.authService.instance.getActiveAccount();

      if (activeAccount) {
        this.Profile.ID = activeAccount.localAccountId;
        this.Profile.Name = activeAccount.name;
        this.Profile.Email = activeAccount.idTokenClaims?.['emails']?.[0] ?? "No email address found.";
      }
      else {
        this.Profile.ID = "Unable to retrieve profile.";
      }
    }, err => {
      this.Profile.ID = "Error contacting API";
    });
  }
}
