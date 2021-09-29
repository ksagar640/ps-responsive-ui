import { API, API_END, API_ERROR } from './types';

export const apiEnd = label => ({
  type: API_END,
  payload: label
});

export const apiError = error => ({
  type: API_ERROR,
  error
});

export function apiAction({ url, method , data , onSuccess , onFailure , label }) {
  return {
    type: API,
    payload: {
      url,
      method,
      data,
      onSuccess : onSuccess,
      onFailure : onFailure,
      label
    }
  };
}
