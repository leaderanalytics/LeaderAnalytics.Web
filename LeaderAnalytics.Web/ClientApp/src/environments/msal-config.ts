import { IPublicClientApplication, PublicClientApplication, LogLevel, BrowserCacheLocation } from '@azure/msal-browser';
import { loggerCallback } from '../app/app.module';


// this checks if the app is running on IE
export const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

/** =================== REGIONS ====================
 * 1) B2C policies and user flows
 * 2) Web API configuration parameters
 * 3) Authentication configuration parameters
 * 4) MSAL-Angular specific configuration parameters
 * ================================================= 
*/

// #region 1) B2C policies and user flows
/**
 * Enter here the user flows and custom policies for your B2C application,
 * To learn more about user flows, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
export const b2cPolicies = {
  names: {
    signUpSignIn: "B2C_1_susi2",
    resetPassword: "b2c_1_password_reset",
    editProfile: "B2C_1_edit_profile_v2"
  },
  authorities: {
    signUpSignIn: {
      authority: "https://leaderanalytics.b2clogin.com/leaderanalytics.onmicrosoft.com/B2C_1_susi2"
    },
    resetPassword: {
      authority: "https://leaderanalytics.b2clogin.com/leaderanalytics.onmicrosoft.com/b2c_1_password_reset"
    },
    editProfile: {
      authority: "https://fabrikamb2c.b2clogin.com/fabrikamb2c.onmicrosoft.com/B2C_1_edit_profile_v2"
    }
  },
  authorityDomain: "https://leaderanalytics.b2clogin.com"
}
// #endregion


// #region 2) Web API Configuration
/** 
 * Enter here the coordinates of your Web API and scopes for access token request
 * The current application coordinates were pre-registered in a B2C tenant.
 */
export const apiConfig: { scopes: string[], uri: string } = {
  scopes: ['https://LeaderAnalytics.onmicrosoft.com/eb373a05-0053-49c4-aba1-a7630fedfef7/read',
    'https://LeaderAnalytics.onmicrosoft.com/eb373a05-0053-49c4-aba1-a7630fedfef7/Write',
    'https://LeaderAnalytics.onmicrosoft.com/eb373a05-0053-49c4-aba1-a7630fedfef7/access_as_user'],
  uri: 'https://localhost:5010/'
};
// #endregion



// #region 3) Authentication Configuration
/** 
 * Config object to be passed to Msal on creation. For a full list of msal.js configuration parameters,
 * visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_configuration_.html
 */
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: "9ea79dd6-d8c9-48da-8f54-6394a953f003",
      authority: b2cPolicies.authorities.signUpSignIn.authority,
      redirectUri: "https://localhost:5031/",
      postLogoutRedirectUri: "https://localhost:5031/",
      knownAuthorities: [b2cPolicies.authorityDomain]
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // Set this to "true" to save cache in cookies to address trusted zones limitations in IE
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false
      }
    }
  });
}
