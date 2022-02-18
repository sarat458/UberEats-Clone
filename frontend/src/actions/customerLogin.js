import Axios from 'axios';
import config from '../urlConfig';
const jwt_decode = require('jwt-decode');
export const login = (data) => async dispatch =>{
    Axios.defaults.withCredentials = true;
    await Axios.post(`${config.BackendURL}/customerLogin`,data,{
        headers:{
            'Accept':'application/json',
            'Content-type':'application/json'
        }
    })
    .then(async res=>{
        //console.log(res);

        // if (res.data.token.length > 0) {
        //     localStorage.setItem("token", res.data.token);

        //     var decoded = jwt_decode(res.data.token.split(' ')[1]);
        //     localStorage.setItem("user_id", decoded._id);
        //     localStorage.setItem("username", decoded.username);
        //     localStorage.setItem("type1",decoded.type);
        //}
        // res.data.token=undefined;
            dispatch({
                type:'CUSTOMER_LOGIN',
                payload:res.data
            })
            dispatch({
                type:'CUSTOMER_LOGIN_ERROR',
                payload:undefined
            })
        
    })
    .catch(err=>{
        //console.log("Error");
        dispatch({
            type:'CUSTOMER_LOGIN_ERROR',
            payload:"Invalid Credentials"
        })
        dispatch({
            type:'CUSTOMER_LOGIN',
            payload:undefined
        })
    })
}
export const signup = (data) => async dispatch =>{
    //console.log("Action");
    await Axios.post(`${config.BackendURL}/customerSignup`,data,{
        headers:{
            'Accept':'application/json',
            'Content-type':'application/json'
        }
    })
    .then(async res=>{
       // console.log(res);
            dispatch({
                type:'CUSTOMER_SIGNUP',
                payload:"Customer Signup Successful"
            })
    })
    .catch(err=>{
        dispatch({
            type:'CUSTOMER_SIGNUP',
            payload:"Customer Signup Error"
        })
    })
}

export const logout = ()=> dispatch =>{
    dispatch({
        type:'CUSTOMER_LOGOUT'
    })
}