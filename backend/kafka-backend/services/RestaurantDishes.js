const Customer = require('../models/customerDetailsSchema');
const favRestaurants=require('../models/favouriteRestaurantsSchema');
const Restaurant = require('../models/restaurantDetailsSchema');
const Address=require('../models/addressSchema');
const Order=require('../models/ordersSchema');
const Dish = require('../models/dishesSchema');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {uuid} = require("uuidv4");

const addDish = async(msg,callback) => {
    let res= {};
    var dishDetails=msg;
    let dish=new Dish({
        DishID:uuid(),
        RestaurantID:dishDetails.restaurantID,
        DishName:dishDetails.DishName,
        MainIngredients:dishDetails.MainIngredients,
        DishImageURL:dishDetails.DishImageURL,
        DishPrice:dishDetails.DishPrice,
        Description:dishDetails.Description,
        DishCategory:dishDetails.DishCategory,
        DishType:dishDetails.DishType
    })
    dish.save((err,results)=>{
        if(err){
            res.status = 500;
            res.data = "Error Occured";
            callback(null, res);
        }else{
            res.status = 200;
            res.data = "Dish Created";
            callback(null,res);
        }
    });
}

const updateDish = async (msg,callback)=>{
    let res= {};
    var update={};
    for (const [key, value] of Object.entries(msg)) {
        if(key=="DishID") continue;
        update[key]=value;
    }
    Dish.findOneAndUpdate({DishID:msg.DishID},update,(error,results)=>{
        if(error){
            res.status = 500;
            res.data = "Error Occured";
            callback(null, res);
        }else{
            res.status = 200;
            res.data = "Update Successful";
            callback(null,res);
        }
    })
}

const getRestaurantMenu = async(msg,callback) => {
    let res= {};
    var restaurantID=msg.RestaurantID;
    Dish.find({RestaurantID:restaurantID},(error,results)=>{
        if(error){
            res.status = 500;
            res.data = "Error Occured";
            callback(null, res);
        }else{
            res.status = 200;
            res.data = results;
            callback(null,res);
        }
    });
}

handle_request = (msg, callback) => {
    if(msg.path==="addDish"){
        delete msg.path;
        addDish(msg,callback);
    }
    else if(msg.path==="updateDish"){
        delete msg.path;
        updateDish(msg,callback);
    }
    else if(msg.path==="getRestaurantMenu"){
        delete msg.path;
        getRestaurantMenu(msg,callback);
    }
}


exports.handle_request = handle_request;