import * as ActionType from '../Actions/types';
import setDefaultpreferences from './setDefaultpreferences';
import InitialState from './InitialState';


export function fetchApiReducer(state = InitialState, action) {
  switch (action.type) {
    case ActionType.FETCH_PRICE:
        return   {...state , rows : action.payload ,data : action.payload};
    case ActionType.FETCH_PREF:
        if ( action.payload.id===-1)
        {
          return {
            ...state,
            preference : setDefaultpreferences(),
          }
        }
        else
        {
          
          return {
            ...state,
            preference : {
              ...state.preference ,
              filters : action.payload.preference.filters,
              sorting : action.payload.preference.sorting,
              currentPage : action.payload.preference.currentPage,
              pageSize : action.payload.preference.pageSize,
              MarketPrice : action.payload.preference.MarketPrice,
              MarketHigh : action.payload.preference.MarketHigh,
              MarketLow : action.payload.preference.MarketLow,
              MarketOpen : action.payload.preference.MarketOpen,
              groups : action.payload.preference.groups
            },
            isHavingPreference : 1
          };      
        }
        case ActionType.UPDATE_MARKET_PRICE :
          return {
              ...state,
              preference : {
                  ...state.preference,
                  MarketPrice : action.payload
              }
          }
      case ActionType.UPDATE_MARKET_OPEN :
          return {
              ...state,
              preference : {
                  ...state.preference,
                  MarketOpen : action.payload
              }
          }
      case ActionType.UPDATE_MARKET_LOW :
          return {
              ...state,
              preference : {
                  ...state.preference,
                  MarketLow : action.payload
              }
          }
      case ActionType.UPDATE_MARKET_HIGH :
          return {
              ...state,
              preference : {
                  ...state.preference,
                  MarketHigh : action.payload
              }
          }
    default:
      return state;
  }
}