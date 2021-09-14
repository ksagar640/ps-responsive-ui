import { Button, Grid, Paper, Typography, Divider } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import { useHistory } from "react-router-dom";
import { FEATURE_URL } from "../../constants/apiConfigurationConstants";

import UseGetUser from "../../hooks/UseGetUser";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
// import axios from "axios";
const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      justifyContent: "center",
      minHeight: "200px",
      padding: "15px",
      marginTop: theme.spacing(8),
      display: "flex",
      alignItems: "center",
    },
  })
);

export const LoginBox = (props) => {
  const { instance } = useMsal();
  let history = useHistory();
  let [argument, setArgument] = useState(null);
  let [status, setstatus] = useState(true);
  const [featureStatus, setFeatureStatus] = useState(true);
  let auth = false;
  const handleLogin = () => {
    //if (loginType === "popup") {
    instance
      .loginPopup(loginRequest)
      .then((arg) => {
        let loginEndPoint = `https://func-price-frontapi-intg-01.azurewebsites.net/api/user-get?code=wNq9pj4yR8VI2nS6phAQSQKyWOHioaNpfW2HzIuztExqyjBkVXGVgA==&clientId=apim-apim-price-intg-01==&email=${arg.account.username}`;

        axios.get(loginEndPoint).then((res) => {
          console.log(res.data.userRole);
          // setstatus(Constants.FETCHED);
          if (res.data.userRole != null) {
            history.push("/pricingView");
          } else {
            instance.logoutRedirect({
              postLogoutRedirectUri: "/notfound",
              mainWindowRedirectUri: "/notfound",
            });
            history.push("/notfound");

            // console.log("risk analyist");
            // history.push("/");
          }
        });

        // console.log(arg.account);
        // setArgument(arg)
        // console.log(argument);
        // history.push('/apiConfig');
      })
      .catch((e) => {
        console.log(e);
      });
    ////argument.account.username
    // .then(() => {
    //   console.log(argument.account.username);
    // });
    // let res = UseGetUser(instance.);
    //}
  };

  useEffect(() => {
    const fetchFeatureStatus = async () => {
      const response = await axios.get(FEATURE_URL, {
        params: {
          featurename: "GetHelpButton",
        },
      });
      setFeatureStatus(response.data[0].isFeatureEnabled);
    };
    fetchFeatureStatus();
  });

  // const loginApi = () =>{

  //   useEffect(() => {
  //     handleLogin();
  // }, []);
  //   console.log(argument)
  // setstatus(1);
  //   return 0;
  // }
  const classes = useStyles();
  return (
    <Paper variant="outlined" square className={classes.paper}>
      <Button
        data-testid="button"
        onClick={() => handleLogin()}
        variant="contained"
        color="primary"
        className="button-element"
      >
        {props.text}
      </Button>
      
      <div>
        {featureStatus ? (
          <Button variant="contained" color="secondary">
            Help
          </Button>
        ) : null}
      </div>
    </Paper>
  );
};
export default LoginBox;
