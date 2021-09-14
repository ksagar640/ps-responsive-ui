import React, { useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LoginBox from "../loginbox/LoginBox";
import Heading from "../heading/Heading";
import '../app/App.css';

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";

import { ProfileData } from "../profiledata/ProfileData";
import { callMsGraph } from "../../graph";

import { headingText, buttonText } from "../../constants/loginPage";

import AdminScreen from '../admin/AdminScreen'


/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */

  const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  function RequestProfileData() {
      // Silently acquires an access token which is then attached to a request for MS Graph data
      instance.acquireTokenSilent({
          ...loginRequest,
          account: accounts[0]
      }).then((response) => {
          callMsGraph(response.accessToken).then(response => setGraphData(response));
      });


  }
  const SignOutButton = () => {
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
      <button  onClick={() => handleLogout("popup")}   variant="contained" color="primary" className="button-element">
                  Sign out 
                  </button>
    );
};
  return (
      <>
      
          <h5 className="card-title">Welcome {accounts[0].name}</h5>
          {graphData ? 
              <ProfileData graphData={graphData} />
              :
              
                <button  onClick={() => RequestProfileData()}   variant="contained" color="primary" className="button-element">
                  Get info 
                  </button>
               }
        <SignOutButton/>
      </>
      
  );
};


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom : '40px'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  loginText : {
    fontSize : '40px',
    fontWeight : 'bold',
    color : 'white'
  }
}));

 const LoginPage = () => {   
  const classes = useStyles();
 
  return (
      <div className="App">
          
                  {/* <AuthenticatedTemplate>
        
                    <AdminScreen/>
                    </AuthenticatedTemplate>        
                 */}
              
         

          <UnauthenticatedTemplate>
          <div>
      <div data-testid="headingTest"><Heading text={headingText} /></div>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography data-testid="loginText" component="h1" variant="h5" className={classes.title}>
          Login
        </Typography>
      </div>
      <div data-testid="buttonTest">
        <LoginBox text = {buttonText}/>
      </div>
    </Container>
    </div>
          </UnauthenticatedTemplate>
      </div>
  );
};

export default LoginPage;