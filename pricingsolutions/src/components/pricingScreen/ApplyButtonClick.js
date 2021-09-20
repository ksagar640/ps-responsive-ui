import {ApplySuccessNotify , ApplyErrorNotify} from './Notification';
import store from '../../store/store';
import {fetchUserPref} from './Actions/fetchUserPrefAction';
import { FETCH_PREF } from './Actions/types';

export default function ApplyButtonClick(loadingStatus , ErrorStatus)
{
    resetFetchPrefStatus();
    const email = localStorage.getItem("Email");
    handleApplyButtonClick(email);
    if (loadingStatus.userPrefLoadingStatus ===  true){
      if (ErrorStatus.userPrefErrorStatus === false)
      {
        ApplySuccessNotify();
      }
      else
      {
       ApplyErrorNotify();
      }
      resetFetchPrefStatus();
    }
}

function handleApplyButtonClick(email){
    store.dispatch(fetchUserPref(email));
}

function resetFetchPrefStatus() {
    store.dispatch({type : "RESET_FETCH_PREF" , payload : FETCH_PREF});
}