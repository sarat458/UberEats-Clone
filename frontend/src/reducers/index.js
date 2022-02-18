import { combineReducers } from 'redux';
import customerLoginReducer from './customerLoginReducer';
import restaurantLoginReducer from './restaurantLoginReducer';
import customerDashBoardReducer from './customerDashBoardReducer';
import restaurantDashboardReducer from './restaurantDashboardReducer';
export default combineReducers({
customerLoginReducer,
restaurantLoginReducer,
customerDashBoardReducer,
restaurantDashboardReducer
});