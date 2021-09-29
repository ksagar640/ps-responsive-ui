
import { FETCH_PRICE, API, API_ERROR } from './types';
import {fetchMarketPriceUrl} from './apiUrlEndPoints';

export function fetchMarketPrice(startDate , endDate) {
  let query = "&startDate="+startDate+"&endDate="+endDate;
  return apiAction({
     url : fetchMarketPriceUrl+query,
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