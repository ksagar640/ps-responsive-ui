import React from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";


  const LogOutButton = () => {
    const { instance } = useMsal();

    const handleLogout = (logoutType) => {
        if (logoutType === "popup") {
            instance.logoutPopup({
                postLogoutRedirectUri: "/",
                mainWindowRedirectUri: "/"
            });
        } else if (logoutType === "redirect") {
            instance.logoutRedirect({
                postLogoutRedirectUri: "/",
            });
        }
    }
    return (
      <button  data-testid = "logOutButtonTest" onClick={ () => {localStorage.clear(); handleLogout("popup")}}   variant="contained" color="primary" className="button">
                  Sign out 
                  </button>
    );
};

export default LogOutButton;