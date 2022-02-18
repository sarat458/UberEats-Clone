const Restaurant = require('../models/restaurantDetailsSchema');
const Dish = require('../models/dishesSchema');
const {uuid} = require("uuidv4");
var kafka = require('../../kafka/client.js');
module.exports.getRestaurants=async(req,res)=>{
    req.body.path="getRestaurants";
    kafka.make_request('customer_login',req.body, function(err,results){
        if (err){
            console.log("Inside err");
            res.statusCode=500;
            res.send(err);
        }else{
            console.log("Inside else");
            res.statusCode=results.status;
            res.send(results.data);

            }
    });
}

module.exports.getRestaurantBasedOnSearch=async(req,res)=>{
    req.query.path="getRestaurantBasedOnSearch";
    kafka.make_request('customer_login',req.query, function(err,results){
        if (err){
            console.log("Inside err");
            res.statusCode=500;
            res.send(err);
        }else{
            console.log("Inside else");
            res.statusCode=results.status;
            res.send(results.data);

            }
    });
}