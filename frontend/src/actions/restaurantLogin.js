import Axios from 'axios';
import config from '../urlConfig';
const jwt_decode = require('jwt-decode');
export const restaurantLogin =  (data) => async dispatch =>{
    await Axios.post(`${config.BackendURL}/restaurantLogin`,data,{
        headers:{
            'Accept':'application/json',
            'Content-type':'application/json'
        }
    })
    .then(async res=>{
        //console.log(res);
        if (res.data.resttoken.length > 0) {
            localStorage.setItem("resttoken", res.data.resttoken);

            var decoded = jwt_decode(res.data.resttoken.split(' ')[1]);
            localStorage.setItem("restaurant_id", decoded._id);
            localStorage.setItem("restaurantname", decoded.username);
            localStorage.setItem("type2",decoded.type);
            res.data.resttoken=undefined;
        }
        
            dispatch({
                type:'RESTAURANT_LOGIN',
                payload:res.data
            })
            dispatch({
                type:'RESTAURANT_LOGIN_ERROR',
                payload:undefined
            })
        
    })
    .catch(err=>{
        //console.log("Error");
        dispatch({
            type:'RESTAURANT_LOGIN_ERROR',
            payload:"Invalid Credentials"
        })
        dispatch({
            type:'RESTAURANT_LOGIN',
            payload:undefined
        })
    })
}
export const restaurantLogout = ()=> dispatch =>{
    console.log("Action Called");
    dispatch({
        type:'RESTAURANT_LOGOUT'
    })
}
export const restaurantSignup = (data) => async dispatch =>{
    console.log("Action");
    await Axios.post(`${config.BackendURL}/restaurantSignup`,data,{
        headers:{
            'Accept':'application/json',
            'Content-type':'application/json'
        }
    })
    .then(async res=>{
        //console.log(res);
            dispatch({
                type:'RESTAURANT_SIGNUP',
                payload:"Signup Sucessful"
            })
    })
    .catch(err=>{
        dispatch({
            type:'RESTAURANT_SIGNUP',
            payload:"Signup Error"
        })
    })
}