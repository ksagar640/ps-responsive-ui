import { Button, Grid, Paper, Typography, Divider } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import { useHistory } from "react-router-dom";
import { FEATURE_URL } from "../../constants/apiConfigurationConstants";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import * as React from "react";
import loginApiCall from "./loginApiCall";
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
  const [featureStatus, setFeatureStatus] = useState(true);
  let auth = false;
  const handleLogin = (endPoint) => {
    instance
      .loginPopup(loginRequest)
      .then((arg) => loginApiCall(instance, history, endPoint+arg.account.username, localStorage))
      .catch((e) => {
        console.log(e);
      });
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

  const classes = useStyles();
  return (
    <Paper variant="outlined" square className={classes.paper}>
      <Button
        data-testid="button"
        onClick={() => handleLogin(props.endPoint)}
        variant="contained"
        color="primary"
        className="button-element"
      >
        {props.text}
      </Button>
     
    </Paper>
  );
};
export default LoginBox;
