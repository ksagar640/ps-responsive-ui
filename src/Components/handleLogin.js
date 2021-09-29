import axios from "axios";
import { loginRequest } from "./authConfig";
import { baseURL } from "../AzureService/url";
import {loginApiEndPoint}  from '../AzureService/url';

export default async function handleLogin(instance , history)  {

    let storage = localStorage;
    instance
      .loginPopup(loginRequest)
      .then( async (arg) =>{
        await axios.get(baseURL + loginApiEndPoint+arg.account.username, {
          headers : {
            "Ocp-Apim-Trace": "true",
            "Authorization" : `Bearer ${arg.idToken}`
        }
        })
        .then((res) => {
          console.log(res); 
          
          if (res.data.userRole != null) {
            
            storage.setItem("Email",arg.account.username);
            storage.setItem("token",res.data.jwtToken)
            if(res.data.userRole=="Admin")
              storage.setItem("userRole","admin");
            else
              storage.setItem("userRole", res.data.userRole);
            history.push("/RegularTables1");
          } 
          else {
              console.log(res.data.message);
              instance.logoutRedirect({
              postLogoutRedirectUri: "/notfound",
              mainWindowRedirectUri: "/notfound",
            });
            history.push("/notfound");
  
          }
        }).catch((e) => {
          console.log(e);
        }
        
      )
    })
    .catch(e=>{
      console.log(e);
    });
  }