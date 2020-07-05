"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// this checks if the app is running on IE
exports.isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
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
exports.b2cPolicies = {
    names: {
        signUpSignIn: "B2C_1_susi",
        resetPassword: "b2c_1_password_reset",
    },
    authorities: {
        signUpSignIn: {
            authority: "https://leaderanalytics.b2clogin.com/leaderanalytics.onmicrosoft.com/B2C_1_susi"
        },
        resetPassword: {
            authority: "https://leaderanalytics.b2clogin.com/leaderanalytics.onmicrosoft.com/b2c_1_password_reset"
        }
    }
};
// #endregion
// #region 2) Web API Configuration
/**
 * Enter here the coordinates of your Web API and scopes for access token request
 * The current application coordinates were pre-registered in a B2C tenant.
 */
exports.apiConfig = {
    b2cScopes: ['https://LeaderAnalytics.onmicrosoft.com/api/read', 'https://LeaderAnalytics.onmicrosoft.com/api/write'],
    webApi: 'https://localhost:5010/'
};
// #endregion
// #region 3) Authentication Configuration
/**
 * Config object to be passed to Msal on creation. For a full list of msal.js configuration parameters,
 * visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_configuration_.html
 */
exports.msalConfig = {
    auth: {
        clientId: "78a660e6-8d4d-48bb-bb01-b3964241101c",
        authority: "https://leaderanalytics.b2clogin.com/leaderanalytics.onmicrosoft.com/B2C_1_susi",
        redirectUri: "https://localhost:5031",
        postLogoutRedirectUri: "https://localhost:5031/",
        navigateToLoginRequestUrl: true,
        validateAuthority: false,
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: exports.isIE,
    },
};
/**
 * Scopes you enter here will be consented once you authenticate. For a full list of available authentication parameters,
 * visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_authenticationparameters_.html
 */
exports.loginRequest = {
    scopes: ['openid', 'profile'],
};
// Scopes you enter will be used for the access token request for your web API
exports.tokenRequest = {
    scopes: exports.apiConfig.b2cScopes // i.e. [https://leaderanalytics.onmicrosoft.com/api/read]
};
// #endregion
// #region 4) MSAL-Angular Configuration
// here you can define the coordinates and required permissions for your protected resources
exports.protectedResourceMap = [
    [exports.apiConfig.webApi, ['https://LeaderAnalytics.onmicrosoft.com/api/read', 'https://LeaderAnalytics.onmicrosoft.com/api/write']]
];
/**
 * MSAL-Angular specific authentication parameters. For a full list of available options,
 * visit https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-angular#config-options-for-msal-initialization
*/
exports.msalAngularConfig = {
    popUp: !exports.isIE,
    consentScopes: __spreadArrays(exports.loginRequest.scopes, exports.tokenRequest.scopes),
    unprotectedResources: ["https://localhost:5031/webapi/sendemail"],
    protectedResourceMap: exports.protectedResourceMap,
    extraQueryParameters: {}
};
// #endregion
//# sourceMappingURL=msal-config.js.map