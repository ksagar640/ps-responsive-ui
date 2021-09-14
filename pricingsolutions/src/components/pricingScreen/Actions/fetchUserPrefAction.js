import { FETCH_PREF, API, API_ERROR } from './types';

export function fetchUserPref(data) {
  let query = '?email='+data;
  return apiAction({
    
   // url: "https://func-price-frontapi-devl-01.azurewebsites.net/api/getPref?code=7a/wg04t3eReDx1oSIut9eT2BWbLMsiUVmL2OtgYmwAhEoYTnLPjkQ==&clientId=apim-apim-price-frontapi-thirdapi-devl-01"+query, // Mocked Backend Data.
    url : "https://apim-price-intg-01.azure-api.net/api/preference-get"+query, 
    data : null,
    onSuccess: fetchPreference,
    onFailure: fetchUserPrefError,
    label: FETCH_PREF
  });
}

export function fetchUserPrefError(error)
{
  console.log("error in fetching user pref" , error);
  return {
    type : API_ERROR,
    payload : FETCH_PREF
  }
}

export function fetchPreference(data) {

  let obj = {
    type: FETCH_PREF,
    payload: {
      email : data.emailId,
      preference : JSON.parse(data.userPreference)
    } 
  };
  return obj;
}

function apiAction({
  url,
  method = 'GET', 
  data,
  onSuccess = () => {},
  onFailure = () => {},
  label
}) {
  return {
    type: API,
    payload: {
      url,
      method,
      data,
      onSuccess,
      onFailure,
      label
    }
  };
}