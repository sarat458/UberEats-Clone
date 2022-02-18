import {RESTAURANT_LOGIN,RESTAURANT_SIGNUP,RESTAURANT_LOGOUT,RESTAURANT_LOGIN_ERROR} from '../constants/action-types.js';

const initialState={};

export default function restaurantLoginReducer(state=initialState,action){
    //console.log("Restaurant Reducer",state,action);
    switch(action.type){
        case RESTAURANT_LOGIN:
            return {...state,restaurantLogin:action.payload};
        case RESTAURANT_SIGNUP:
            return {...state,restaurantSignup:action.payload};
        case RESTAURANT_LOGOUT:
            return {};
        case RESTAURANT_LOGIN_ERROR:
            return {...state,restaurantLoginError:action.payload};
        default:
            return state;
    }


}