import axios from 'axios';
import azure from '../AzureService/azure';
import { API} from '../Actions/types';
import { apiEnd} from '../Actions/apiAction';

const apiMiddleware = ({ dispatch }) => next => action => {
  if (action !==undefined && action.type !== API) { 
    next(action);
  }
  else{  
  
  const { url, method, data, onSuccess, onFailure, label } = action.payload;
  const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';
 
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || '';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  
  azure.request({
      url,
      method,
      [dataOrParams]: data,
    })
    .then(({data}) => {dispatch(onSuccess(data));})
    .catch(error => {
      dispatch(onFailure(error));
      
    })
    .finally(() => {
      if (label) {
        dispatch(apiEnd(label));
      }
    });
  }
};
export default apiMiddleware;