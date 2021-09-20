import {connect} from 'react-redux';
import {fetchUserPref} from './Actions/fetchUserPrefAction';
import { FETCH_PREF } from './Actions/types';
import Button from '@material-ui/core/Button';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ApplySuccessNotify , ApplyErrorNotify} from './Notification';
import React from 'react';

function ApplyUserPrefButton({ loadingStatus,ErrorStatus ,handleApplyButtonClick,resetFetchPrefStatus}) {

  return (
    <div>
        <ToastContainer/>
        <Button
            data-testid = {"applyPrefBtn"} 
            variant="contained" color="primary" onClick = {()=>{
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
          }}>
            Apply Preference
          </Button>
          
    </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleApplyButtonClick : (email) => {
          dispatch(fetchUserPref(email))
        },
        resetFetchPrefStatus: () => {
          dispatch({type : "RESET_FETCH_PREF" , payload : FETCH_PREF});
        }
    }
  }
  
  export default connect(
    null,
    mapDispatchToProps
  )(ApplyUserPrefButton);