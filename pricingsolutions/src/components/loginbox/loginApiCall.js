import axios from "axios";
import azure from "../../api/azure";
export default async function loginApiCall (instance, history, endPoint, storage)  {

  await azure.get(endPoint)
  .then((res) => {
    console.log(res);
    
    if (res.data.userRoleName != null) {
      
      storage.setItem("Email",res.data.emailId);
      if(res.data.userRoleName=="Admin")
        storage.setItem("userRole","admin");
      else
        storage.setItem("userRole", res.data.userRoleName);
      history.push("/pricingView");
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
  });
  
}