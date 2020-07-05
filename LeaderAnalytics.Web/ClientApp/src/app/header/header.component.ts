import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { StateService } from '../services/state.service'
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Logger, CryptoUtils } from 'msal';
import { isIE, b2cPolicies } from '../../environments/msal-config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  @ViewChild(LoginComponent) loginComponent: LoginComponent;
  @Output() showLoginDialog = new EventEmitter<boolean>();
  public ActiveLinkName: string;
  isIframe = false;
  loggedIn = false;



  
  constructor(private router: Router, private broadcastService: BroadcastService, private authService: MsalService, public stateService: StateService)
  {
    this.ActiveLinkName = 'home';
  }

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;

    // event listeners for authentication status
    this.broadcastService.subscribe('msal:loginSuccess', (success) => {

      // We need to reject id tokens that were not issued with the default sign-in policy.
      // "acr" claim in the token tells us what policy is used (NOTE: for new policies (v2.0), use "tfp" instead of "acr")
      // To learn more about b2c tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
      if (success.idToken.claims['tfp'] !== b2cPolicies.names.signUpSignIn) {
        window.alert("Password has been reset successfully. \nPlease sign-in with your new password");
        this.LogOut();
        return
      }
      this.stateService.SetLoginStatus(true);
      console.log('login succeeded. id token acquired at: ' + new Date().toString());
      console.log(success);
    });

    this.broadcastService.subscribe('msal:loginFailure', (error) => {
      console.log('login failed');
      console.log(error);

      // Check for forgot password error
      // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
      if (error.errorMessage.indexOf('AADB2C90118') > -1) {
        if (isIE) {
          this.authService.loginRedirect(b2cPolicies.authorities.resetPassword);
        } else {
          this.authService.loginPopup(b2cPolicies.authorities.resetPassword);
        }
      }
    });

    // redirect callback for redirect flow (IE)
    this.authService.handleRedirectCallback((authError, response) => {
      if (authError) {
        console.error('Redirect Error: ', authError.errorMessage);
        return;
      }

      console.log('Redirect Success: ', response);
    });

    this.authService.setLogger(new Logger((logLevel, message, piiEnabled) => {
      console.log('MSAL Logging: ', message);
    }, {
      correlationId: CryptoUtils.createNewGuid(),
      piiLoggingEnabled: false
    }));
  }


  LogIn() {

    if (isIE) {
      this.authService.loginRedirect();
    } else {
      this.authService.loginPopup();
    }

    // See the callback in ngOnInit that calls SetLoginStatus
    //this.showLoginDialog.emit(true);
    //const account = this.authService.getAccount();
  }

  LogOut() {
    this.authService.logout();
    this.stateService.SetLoginStatus(false);

  }

  SetActiveLinkName(linkname: string) {
    this.ActiveLinkName = linkname;
  }
}
