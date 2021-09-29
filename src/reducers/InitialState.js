import setDefaultpreferences from "./setDefaultpreferences"

const InitialState = {
    data : [],
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
    isHavingPreference : 0  
}

export default InitialState;

