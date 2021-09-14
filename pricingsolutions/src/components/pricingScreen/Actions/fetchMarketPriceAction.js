
import { FETCH_PRICE, API, API_ERROR } from './types';

export function fetchMarketPrice() {
  return apiAction({
   // url: 'https://func-price-frontapi-devl-01.azurewebsites.net/api/GetPricingData?code=7a/wg04t3eReDx1oSIut9eT2BWbLMsiUVmL2OtgYmwAhEoYTnLPjkQ==&clientId=apim-apim-price-frontapi-thirdapi-devl-01', // Mocked Backend Data.
     url: 'https://apim-price-intg-01.azure-api.net/api/pricingdata-get',
    onSuccess: fetchPrice,
    onFailure: fetchMarketPriceError,
    label: FETCH_PRICE
  });
}

export function fetchMarketPriceError(error)
{
  return {
    type : API_ERROR,
    payload : FETCH_PRICE
  };
}
export function fetchPrice(data) {
 
  return {
    type: FETCH_PRICE,
    payload:  data
  };
}

function apiAction({
  url,
  method = 'GET', 
  data = null,
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