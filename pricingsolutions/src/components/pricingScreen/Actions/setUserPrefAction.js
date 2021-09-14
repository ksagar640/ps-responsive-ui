import { SET_PREF, API, API_ERROR } from './types';

export function setUserPref(data) {
  console.log('Inside set User Pref',data);
  return apiAction({
    //url: 'https://func-price-frontapi-intg-01.azurewebsites.net/api/preference-save?code=wNq9pj4yR8VI2nS6phAQSQKyWOHioaNpfW2HzIuztExqyjBkVXGVgA==&clientId=apim-apim-price-intg-01', // Mocked Backend Data.
    url : "https://apim-price-intg-01.azure-api.net/api/preference-save", 
    data: data,
    onSuccess: setPreference,
    onFailure: setPreferenceError,
    label: SET_PREF
  });
}

export function setPreference(data) {
  
  return {
    type: SET_PREF,
    payload: data
  };
}
export function setPreferenceError(data) {
  return {
    type: API_ERROR,
    payload: SET_PREF
  };
}

function apiAction({
  url,
  method = 'POST',
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