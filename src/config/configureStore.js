import { createStore, combineReducers , applyMiddleware } from 'redux';
import reducers from '../reducers';
import apiMiddleware from '../Middleware/apiMiddleware';
export default function configureStore() {
  return createStore(
    combineReducers({
      ...reducers
    }),
    applyMiddleware(apiMiddleware)
  );
}
