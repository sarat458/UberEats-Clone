import {UPDATE_RESTAURANT_PROFILE} from '../constants/action-types.js';
const initialState={};

export default function getRestaurants(state=initialState,action){
    switch(action.type){
        case UPDATE_RESTAURANT_PROFILE:
            return {...state,restaurantLogin:action.payload}
        default:
            return state;
    }
}