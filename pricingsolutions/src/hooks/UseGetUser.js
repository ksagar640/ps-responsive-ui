import { useEffect, useState } from "react";
import axios from "axios";

const UseGetUser = (emailID)=>{
    let loginEndPoint = `https://func-price-frontapi-intg-01.azurewebsites.net/api/user-get?code=wNq9pj4yR8VI2nS6phAQSQKyWOHioaNpfW2HzIuztExqyjBkVXGVgA==&clientId=apim-apim-price-intg-01==&email=${emailID}`;
    //loginEndPoint
    // let loginEndPoint = `https://func-price-frontapi-intg-01.azurewebsites.net/api/user-get?code=wNq9pj4yR8VI2nS6phAQSQKyWOHioaNpfW2HzIuztExqyjBkVXGVgA==&clientId=apim-apim-price-intg-01==&email=ajaydp31@gmail.com`;
    
    let [response, setResponse] = useState(null);
    let [error, setError] = useState('');
    let [status, setstatus] = useState(true);
  
    const fetchData = () => {
        // setstatus(Constants.FETCHING)
           axios
             .get(loginEndPoint)
             .then((res) => {
               console.log(res);
                setResponse(res.data);
                // setstatus(Constants.FETCHED);
             })
             .catch((err) => {
                 setError(err);
                //  setstatus(Constants.ERROR_FETCHING);
             });
  
    };
  
     useEffect(() => {
        fetchData();
    }, []);
  
    console.log(response);
  
  return response;
};

export default UseGetUser;