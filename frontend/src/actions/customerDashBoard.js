import Axios from 'axios';
import config from '../urlConfig.js';
export const getRestaurants= () => async dispatch =>{
    Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await Axios.get(`${config.BackendURL}/getRestaurants`)
    .then(async (res)=>{
        console.log("Action",res);
        dispatch({
            type:"GET_RESTAURANTS",
            payload:res.data
        });
    })
    .catch(err=>{
        console.log("Action",err);
        dispatch({
            type:"GET_RESTAURANTS",
            payload:[]
        });
    });
}
export const searchRestaurants = (search,type) => async dispatch =>{
   // console.log("Action",search,type);
   Axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    await Axios.get(`${config.BackendURL}/getRestaurantOnSearch?search=${search}&type=${type}`)
    .then(async (res)=>{
        console.log("Data from backend",res.data);
        dispatch({
            type:"GET_RESTAURANTS_ON_SEARCH",
            payload:res.data
        });
    })
    .catch(err=>{
        dispatch({
            type:"GET_RESTAURANTS_ON_SEARCH",
            payload:[]
        });
    })
}
export const setRestaurants = (data) =>async dispatch =>{
    dispatch({
        type:"GET_RESTAURANTS_ON_SEARCH",
        payload:data
    })
}
export const updateCustomerProfile=(details) => async dispatch =>{
    dispatch({
        type:"UPDATE_CUSTOMER_PROFILE",
        payload:details
    })
}
export const viewRestaurantPage= (details)=>async dispatch=>{
    console.log("Action",details);
    dispatch({
        type:"VIEW_RESTAURANT_PAGE",
        payload:details
    })
}
export const updateCartItems=(data)=>async dispatch=>{
    dispatch({
        type:"UPDATE_CART_ITEMS",
        payload:data
    })
}
export const updateFavouriteRestaurants=(data)=>async dispatch=>{
    dispatch({
        type:"UPDATE_FAV_RESTAURANTS",
        payload:data
    })
}
export const setFoodType=(data)=>async dispatch=>{
    //console.log("Action",data);
    dispatch({
        type:"SET_FOOD_TYPE",
        payload:data
    })
}