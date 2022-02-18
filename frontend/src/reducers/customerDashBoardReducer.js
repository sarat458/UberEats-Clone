import {GET_RESTAURANTS,GET_RESTAURANTS_ON_SEARCH,VIEW_RESTAURANT_PAGE,UPDATE_CART_ITEMS,UPDATE_FAV_RESTAURANTS,SET_FOOD_TYPE} from '../constants/action-types.js';
const initialState={};

export default function getRestaurants(state=initialState,action){
    switch(action.type){
        case GET_RESTAURANTS:
            return {...state,restaurantData:action.payload,restaurantDataMod:action.payload}
        case GET_RESTAURANTS_ON_SEARCH:
            return {...state,restaurantDataMod:action.payload}
        case VIEW_RESTAURANT_PAGE:
            return {...state,restaurantViewData:action.payload}
        case UPDATE_CART_ITEMS:
            return {...state,cartItems:action.payload}
        case UPDATE_FAV_RESTAURANTS:
            return {...state,favRestaurants:action.payload}
        case SET_FOOD_TYPE:
            console.log("Reducer");
            return {...state,foodType:action.payload}
        default:
            return state;
    }
}