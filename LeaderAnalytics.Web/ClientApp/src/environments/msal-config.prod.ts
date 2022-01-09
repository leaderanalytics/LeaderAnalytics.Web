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
  },
  authorities: {
    signUpSignIn: {
      authority: "https://leaderanalytics.b2clogin.com/leaderanalytics.onmicrosoft.com/B2C_1_susi2"
    },
    resetPassword: {
      authority: "https://leaderanalytics.b2clogin.com/leaderanalytics.onmicrosoft.com/b2c_1_password_reset"
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
  scopes: ['https://LeaderAnalytics.onmicrosoft.com/api/read',
    'https://LeaderAnalytics.onmicrosoft.com/api/write',
    'https://LeaderAnalytics.onmicrosoft.com/api/access_as_user'  ],
  uri: 'https://leaderanalytics.com/api/'
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
      clientId: "78a660e6-8d4d-48bb-bb01-b3964241101c",
      authority: b2cPolicies.authorities.signUpSignIn.authority,
      redirectUri: "https://leaderanalytics.com/",
      postLogoutRedirectUri: "https://leaderanalytics.com/",
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
