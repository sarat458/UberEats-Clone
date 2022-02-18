const {uuid} = require("uuidv4");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Restaurant = require('../models/restaurantDetailsSchema');
const Customer = require('../models/customerDetailsSchema');
const Dish = require('../models/dishesSchema');
const Order=require('../models/ordersSchema');
var kafka = require('../../kafka/client.js');
module.exports.restaurantSignup=async(req,res)=>{
    req.body.path="restaurantSignup";
    kafka.make_request('restaurant',req.body, function(err,results){
        console.log('in result');
        console.log(results);
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

module.exports.restaurantLogin=async(req,res)=>{
    req.body.path="restaurantLogin";
    kafka.make_request('restaurant',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.statusCode=500;
            res.send(err);
        }else{
            console.log("Inside else");
            res.statusCode=results.status;
            if(res.statusCode===200)
                results.data.Password=undefined;
                results.data["resttoken"]=results.token;
            res.send(results.data);

            }
        
    });
}

module.exports.restaurantProfile=async(req,res)=>{
    req.query.path="restaurantProfile";
    kafka.make_request('restaurant',req.query, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.statusCode=500;
            res.send(err);
        }else{
            console.log("Inside else");
            res.statusCode=results.status;
            if(res.statusCode===200)
                results.data.Password=undefined;
            res.send(results.data);

            }
        
    });
}
module.exports.updateRestaurantProfile=async(req,res)=>{
    req.body.path="updateRestaurantProfile";
    kafka.make_request('restaurant',req.body, function(err,results){
        console.log('in result');
        console.log(results);
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

module.exports.getCustomerProfile=async (req,res)=>{
    req.query.path="getCustomerProfile";
    kafka.make_request('restaurant',req.query, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.statusCode=500;
            res.send(err);
        }else{
            console.log("Inside else");
            res.statusCode=results.status;
            if(res.statusCode===200)
                results.data.Password=undefined;
            res.send(results.data);

            }
    });
}

module.exports.addDish=async(req,res)=>{
    req.body.path="addDish";
    kafka.make_request('restaurant_dishes',req.body, function(err,results){
        console.log('in result');
        console.log(results);
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

module.exports.updateDish=async(req,res)=>{
    req.body.path="updateDish";
    kafka.make_request('restaurant_dishes',req.body, function(err,results){
        console.log('in result');
        console.log(results);
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
module.exports.getOrderMenu=async(req,res)=>{
    req.query.path="getOrderMenu";
    kafka.make_request('restaurant_orders',req.query, function(err,results){
        console.log('in result');
        console.log(results);
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
module.exports.getRestaurantOrders=async(req,res)=>{
    req.query.path="getRestaurantOrders";
    kafka.make_request('restaurant_orders',req.query, function(err,results){
        console.log('in result');
        console.log(results);
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
module.exports.updateDeliveryStatus=async(req,res)=>{
    req.body.path="updateDeliveryStatus";
    kafka.make_request('restaurant_orders',req.body, function(err,results){
        console.log('in result');
        console.log(results);
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
// module.exports.updateOrderStatus=async(req,res)=>{


// }
module.exports.getRestaurantMenu =async(req,res)=>{
    req.query.path="getRestaurantMenu";
    kafka.make_request('restaurant_dishes',req.query, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.statusCode=500;
            res.send(err);
        }else{
            console.log("Inside else");
            res.statusCode=results.status;
            if(res.statusCode===200)
                results.data.Password=undefined;
            res.send(results.data);

            }
    });
}