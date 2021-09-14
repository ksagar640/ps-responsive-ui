import { API_END, FETCH_PRICE, FETCH_PREF, API_ERROR, SET_PREF } from '../Actions/types';
import setDefaultpreferences from './setDefaultpreferences';
const InitialStore = {
  email: 'ajaydp322@gmail.com',
  rows : [],
  preference : setDefaultpreferences(),
  loadingStatus :  {
     marketPriceLoadingStatus : false,
     userPrefLoadingStatus : false,
     saveUserLoadingStatus : false,
  },
  ErrorStatus : {
    marketPriceErrorStatus : false,
    userPrefErrorStatus : false,
    saveUserErrorStatus : false,
  },
  isHavingPreference : 1
}

export default function rootReducer(state = InitialStore, action) {
  switch (action.type) {
    case API_END:
      if (action.payload === FETCH_PRICE)
      {  
        return {
          ...state,
          loadingStatus : {
              ...state.loadingStatus,
              marketPriceLoadingStatus : true
          }
        };
      }
      else if (action.payload === FETCH_PREF)
      {
        return {
          ...state,
          loadingStatus : {
              ...state.loadingStatus,
              userPrefLoadingStatus : true
          }
        };
      }
      else if (action.payload === SET_PREF)
      {
        return {
          ...state,
          loadingStatus : {
              ...state.loadingStatus,
              saveUserLoadingStatus : true
          }
        };
      }
      else
      {
        return state;
      }
   
    case API_ERROR:
      if (action.payload === FETCH_PRICE)
      {  
        return {
          ...state,
          ErrorStatus : {
              ...state.ErrorStatus,
              marketPriceErrorStatus : true
          }
        };
      }
      else if (action.payload === FETCH_PREF)
      {
        return {
          ...state,
          ErrorStatus : {
              ...state.ErrorStatus,
              userPrefErrorStatus : true
          }
        };
      }
      else if (action.payload === SET_PREF)
      {
        return {
          ...state,
          ErrorStatus : {
              ...state.ErrorStatus,
              saveUserErrorStatus : true
          }
        };
      }
      else 
      {
        return state;
      }
    case FETCH_PRICE:
        return   {...state , rows : action.payload};
    case FETCH_PREF:
        if ( Object.keys(action.payload.preference).length === 0)
        {
          
          return {
            ...state,
            email : action.payload.email,
            preference : setDefaultpreferences(),
            isHavingPreference : 0
          }
        }
        else
        {
          
          return {
            ...state,
            email : action.payload.email,
            preference : {
              ...state.preference ,
              filters : action.payload.preference.filters,
              sorting : action.payload.preference.sorting,
              currentPage : action.payload.preference.currentPage,
              pageSize : action.payload.preference.pageSize,
              MarketPrice : action.payload.preference.MarketPrice,
              MarketHigh : action.payload.preference.MarketHigh,
              groups : action.payload.preference.groups
            }
          };      
        }
    default:
      return state;
  }
}