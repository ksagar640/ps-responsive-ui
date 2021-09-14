import {  API_END, API_ERROR, API_START } from './types';

export const apiEnd = label => ({
  type: API_END,
  payload: label
});

export const apiError = error => ({
  type: API_ERROR,
  error
});
