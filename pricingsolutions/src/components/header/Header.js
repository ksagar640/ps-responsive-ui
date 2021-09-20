import { Fragment } from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import React from "react"
import classes from './Header.module.css';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import {connect}from 'react-redux';


export   const SignOutButton = () => {
    const { instance } = useMsal();
    const handleLogout = (logoutType) => {
        if (logoutType === "popup") {
            instance.logoutPopup({
                postLogoutRedirectUri: "/",
                mainWindowRedirectUri: "/"
            });
        } 
    }

    return (
      
      <button  onClick={() => {localStorage.clear(); handleLogout("popup") ; } } variant="contained" color="primary" className={classes.button}>
                  Sign out 
                  </button>
    );
};

function Header (props) {
  //const isRiskAnalyst=props.userRole ;
  var userRole =localStorage.getItem("userRole");
  if(userRole==='admin')
  {
    return (
    <Fragment>
      <header className={classes.header} data-testid="headerTest">
        <h1 data-testid="headingTest">Pricing Solution</h1>
         {/* if(props.userRole == "admin"){ */}
         {/* <Router> */}
        <Link to ='/apiconfig'>
        <button type ="button" data-testid="buttonTest" className={classes.button}>Admin View</button>
          {/* } */}
        </Link>
        {/* </Router> */}
            <SignOutButton/>
          
      </header>
      
    </Fragment>
  );
  }
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Pricing Solution</h1>
        
          
            
           <SignOutButton/>
          
      </header>
    </Fragment>
  );
};
export default Header;