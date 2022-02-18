const Customer = require('../models/customerDetailsSchema');
const favRestaurants=require('../models/favouriteRestaurantsSchema');
const Restaurant = require('../models/restaurantDetailsSchema');
const Address=require('../models/addressSchema');
const Order=require('../models/ordersSchema');
var kafka = require('../../kafka/client.js');
const {uuid} = require("uuidv4");
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports.customerSignup=async(req,res)=>{
    req.body.path="customerSignup";
    kafka.make_request('customer_login',req.body, function(err,results){
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
module.exports.customerLogin=async(req,res)=>{
    req.body.path="customerLogin";
    kafka.make_request('customer_login',req.body, function(err,results){
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
                results.data["token"]=results.token;
            res.send(results.data);

            }
        
    });
    }
module.exports.updateCustomerProfile=async(req,res)=>{
    req.body.path="updateCustomerProfile";
    kafka.make_request('customer_login',req.body, function(err,results){
        //console.log('in result');
        //console.log(results);
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
module.exports.addToFavourites=async(req,res)=>{
    req.body.path="addToFavourites";
    kafka.make_request('customer_login',req.body, function(err,results){
        //console.log('in result');
       // console.log(results);
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
module.exports.getFavouriteRestaurants=async(req,res)=>{
    request={};
    request.path="getFavouriteRestaurants";
    request.customerID=req.query.customerID;
    
    kafka.make_request('customer_login',request, function(err,results){
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
module.exports.addAddress=async(req,res)=>{
    req.body.path="addAddress";
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
module.exports.getAddress=async(req,res)=>{
    req.query.path="getAddress";
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
module.exports.getCustomerOrders=async(req,res)=>{
    req.query.path="getCustomerOrders";
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
module.exports.placeCustomerOrder=async(req,res)=>{
    req.body.path="placeCustomerOrder";
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

module.exports.cancelCustomerOrder = async(req,res) => {
    req.body.path="cancelCustomerOrder";
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
