
import {ourClientId, ourAuthority, ourRedirectUri, ourGraphMeEndpoint} from '../AzureService/authConfigConstants';
import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        clientId: ourClientId,
        authority: ourAuthority,
        // redirectUri: "https://ase-price-frontend-intg-01.azurewebsites.net",
        navigateToLoginRequestUrl: true,
        //redirectUri : ourRedirectUri
    },
    cache: {
        cacheLocation: "sessionStorage", 
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {	
        loggerOptions: {	
            loggerCallback: (level, message, containsPii) => {	
                if (containsPii) {		
                    return;		
                }		
                switch (level) {		
                    case LogLevel.Error: 
                        console.error(message); 
                        return;		
                    case LogLevel.Info: 
                        console.info(message); 
                            return;		
                    case LogLevel.Verbose: 
                        console.debug(message); 
                        return;		
                    case LogLevel.Warning: 
                        console.warn(message); 
                        return;		
                }	
            }	
        }	
    }
};
export const loginRequest = {
    scopes: ["User.Read"]
};
export const graphConfig = {
    graphMeEndpoint: ourGraphMeEndpoint
};
