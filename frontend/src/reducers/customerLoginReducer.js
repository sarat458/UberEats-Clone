import { CUSTOMER_LOGIN,CUSTOMER_SIGNUP,CUSTOMER_LOGOUT,CUSTOMER_LOGIN_ERROR,UPDATE_CUSTOMER_PROFILE } from "../constants/action-types";

const initialState={};

export default function customerLoginReducer(state=initialState,action){
    //console.log("Reducer CustomerLogin",action,state);
    switch(action.type){
        case CUSTOMER_LOGIN:
            return {...state,customerLogin:action.payload};
        case CUSTOMER_LOGIN_ERROR:
            return {...state,customerLoginError:action.payload};
        case CUSTOMER_SIGNUP:
            return {...state,customerSignUp:action.payload};
        case UPDATE_CUSTOMER_PROFILE:
            return {...state,customerLogin:action.payload};
        case CUSTOMER_LOGOUT:
            return {};
        default:
            return state;
    }
}