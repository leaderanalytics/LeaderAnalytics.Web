import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import { InteractionRequiredAuthError, AuthError, Account } from 'msal';
import { apiConfig } from '../../environments/msal-config';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  Profile: Account;
  Email: string;
  ApiVerification: string;

  constructor(private broadcastService: BroadcastService, private authService: MsalService, private http: HttpClient)
  {
    this.Profile = new Account('','','unknown','unknown',null,'','');
    this.Email = 'unknown';
    this.ApiVerification = 'Not verified';
  }

  ngOnInit(): void {
    this.callAPI(apiConfig.webApi + 'api/status/SecureIdentity');

    this.broadcastService.subscribe('msal:acquireTokenSuccess', (payload) => {
      console.log('access token acquired at: ' + new Date().toString());
      console.log(payload);
      this.Profile = payload.account;
      this.Email = payload.account.idTokenClaims.emails[0];
    });

    this.broadcastService.subscribe('msal:acquireTokenFailure', (payload) => {
      console.log('access token acquisition fails');
      console.log(payload);
    });
  }

  callAPI(url: string) {
    this.http.get(url).subscribe({
      next: (response) => {
        this.ApiVerification = response.toString();
      },
      error: (err: AuthError) => {
        // If there is an interaction required error,
        // call one of the interactive methods and then make the request again.
        if (InteractionRequiredAuthError.isInteractionRequiredError(err.errorCode)) {
          
          this.authService.acquireTokenPopup({
            scopes: this.authService.getScopesForEndpoint(url)
          }).then(() => {
            this.http.get(url).toPromise()
              .then(response => {
                this.ApiVerification = response.toString();
              });
          });
        }
      }
    });
  }
}
