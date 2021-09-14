import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import classes from './Header.module.css';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";



export   const SignOutButton = () => {
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
      <button  onClick={() => handleLogout("popup")}   variant="contained" color="primary" className={classes.button}>
                  Sign out 
                  </button>
    );
};
const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Pricing Solution</h1>
        <Link to ='/apiconfig'>
          {/* if(props.userRole == "admin"){ */}
        <button type ="button" className={classes.button}>Admin View</button>
          {/* } */}
        </Link>
     <SignOutButton/>
      </header>
      
    </Fragment>
  );
};

export default Header;