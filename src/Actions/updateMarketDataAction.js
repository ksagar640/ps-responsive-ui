import * as ActionTypes from './types';

export const updateMarketPriceAction = (data) => ({
    type: ActionTypes.UPDATE_MARKET_PRICE,
    payload: data
  });
  
  export const updateMarketOpenAction = (data) => ({
    type: ActionTypes.UPDATE_MARKET_OPEN,
    payload: data
  });


  export const updateMarketLowAction = (data) => ({
    type: ActionTypes.UPDATE_MARKET_LOW,
    payload: data
  });


  export const updateMarketHighAction = (data) => ({
    type: ActionTypes.UPDATE_MARKET_HIGH,
    payload: data
  });
