import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../components/pricingScreen/reducers/pricingSolutionReducer';
import apiMiddleware from '../components/pricingScreen/Middleware/dbApiMiddleware'

const store = createStore(rootReducer, applyMiddleware(apiMiddleware));
window.store = store;
export default store;