const Customer = require('../models/customerDetailsSchema');
const favRestaurants=require('../models/favouriteRestaurantsSchema');
const Restaurant = require('../models/restaurantDetailsSchema');
const Address=require('../models/addressSchema');
const Order=require('../models/ordersSchema');
const Dish = require('../models/dishesSchema');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { secret } = require('../../mongoConfig');
const {uuid} = require("uuidv4");

const restaurantLogin = async (msg,callback) => {
    let res= {};
    const {email,password} = msg;
    Restaurant.findOne({Email:email},async (error,results)=>{
        if (error) {
            res.status = 500;
            res.data = "Error Occured";
            callback(null, res);
            return;
        }
        if(results==null){
           //callback(error, "Invalid Credentials");
            res.status = 404;
            res.data = "Invalid Credentials";
            callback(null, res);
           return;
        }
       let match= await bcrypt.compare(password, results.Password);
       if(!match){
        res.status = 404;
        res.data = "Invalid Credentials";
        callback(null, res);
       }else{
        res.status = 200;
        res.data=results;
        const payload = { _id: results._id, username: results.Name, type:"restaurant"};
        const token = jwt.sign(payload, secret, {
            expiresIn: 1008000
        });
        res.token="JWT " + token;
        callback(null, res);
       }
    });
}

const restaurantSignup = async (msg,callback) => {
    let res= {};
    const {password,email,name,location}=msg;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        let newRestaurant=new Restaurant({
            RestaurantID:uuid(),
            Email:email,
            Password:hash,
            Name:name,
            Location:location
        });
        newRestaurant.save((err,results)=>{
            if(err){
                res.status = 500;
                res.data = "Error Occured";
                callback(null, res);
            }else{
                res.status = 200;
                res.data = "Insertion Succesful";
                callback(null,res);
            }
        })
    });
}

const restaurantProfile = async (msg,callback) => {
    let res= {};
    var restaurantID=msg.restaurantID;
    Restaurant.findOne({RestaurantID:restaurantID},(error,results)=>{
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

const updateRestaurantProfile =async(msg,callback) => {
    let res= {};
    var filter={RestaurantID:msg.RestaurantID};
    var update={};
    for (const [key, value] of Object.entries(msg)) {
        if(key=="RestaurantID") continue;
        update[key]=value;
    }
    console.log("Check",update);
    Restaurant.findOneAndUpdate(filter,update,async(error,results)=>{
        if(error){
            res.status=500;
            res.data="Update Unsuccessful";
            callback(null,res);
        }else{
            res.status=200;
            res.data="Update Successful";
            callback(null,res);
        }
    })
}

const getCustomerProfile = async (msg,callback) => {
    let res= {};
    var customerID=msg.customerID;
    Customer.findOne({CustomerID:customerID},(error,results)=>{
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
    if(msg.path==="restaurantLogin"){
        delete msg.path;
        restaurantLogin(msg,callback);
    }
    else if(msg.path==="restaurantSignup"){
        delete msg.path;
        restaurantSignup(msg,callback);
    }
    else if(msg.path==="restaurantProfile"){
        delete msg.path;
        restaurantProfile(msg,callback);
    }
    else if(msg.path==="updateRestaurantProfile"){
        delete msg.path;
        updateRestaurantProfile(msg,callback);
    }
    else if(msg.path==="getCustomerProfile"){
        delete msg.path;
        getCustomerProfile(msg,callback);
    }
}

exports.handle_request = handle_request;