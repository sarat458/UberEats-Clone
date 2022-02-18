
import { gql } from 'apollo-boost';

const loginMutation = gql`
    mutation ($email: String , $password: String){
        customerLogin(email: $email , password: $password){
            Name
            Password
            Email
        }
    }
`;

const customerSignupMutation = gql`
    mutation($name : String , $email : String , $password : String){
        customerSignup(name : $name , email : $email , password : $password){
            status
            Name
            ImageURL
            Nickname
        }
    }
`;

const updateCustomerProfileMutation = gql`
    mutation($updateDetails : CustomerInputType){
        updateCustomerProfile(updateDetails : $updateDetails){
            status
        }
    }
`;

const restaurantSignupMutation = gql`
    mutation($name : String , $email : String , $password : String , $location : String){
        restaurantSignup(name : $name , email : $email , password : $password,location : $location){
            status
            Name
            ImageURL
            Description
            Veg
            Nonveg
            Vegan
            Address
            Timings
        }
    }
`;

const placeCustomerOrderMutation = gql`
    mutation($orderDetails : OrderInputType){
        placeCustomerOrder(orderDetails : $orderDetails){
            status
        }
    }
`;

const updateRestaurantProfileMutation = gql`
    mutation($details : RestaurantInputType){
        updateRestaurantProfile(details : $details){
            status
            Name
            ImageURL
            Description
            Veg
            Nonveg
            Vegan
            Address
            Timings
        }
    }
`;

const addDishMutation = gql`
    mutation($details : DishInputType){
        addDish(details : $details){
            status
            DishName
            DishID
            Description
            DishImageURL
        }
    }
`;

const updateDishMutation = gql`
    mutation($details : DishInputType){
        updateDish(details : $details){
            status
            DishName
            DishID
            Description
            DishImageURL
        }
    }
`;

const updateDeliveryStatusMutation = gql`
    mutation($details : UpdateStatusInputType){
        updateDeliveryStatus(details : $details){
            status
            success
        }
    }
`;

export {loginMutation,customerSignupMutation, updateCustomerProfileMutation,restaurantSignupMutation,
placeCustomerOrderMutation , updateRestaurantProfileMutation,addDishMutation, updateDishMutation,updateDeliveryStatusMutation};