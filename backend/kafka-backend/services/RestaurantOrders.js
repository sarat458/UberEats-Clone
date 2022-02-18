const Customer = require('../models/customerDetailsSchema');
const favRestaurants=require('../models/favouriteRestaurantsSchema');
const Restaurant = require('../models/restaurantDetailsSchema');
const Address=require('../models/addressSchema');
const Order=require('../models/ordersSchema');
const Dish = require('../models/dishesSchema');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {uuid} = require("uuidv4");

const getOrderMenu = async (msg,callback) => {
    let res= {};
    let {OrderID}=msg;
    Order.findOne({OrderID:OrderID},{_id:false,Menu:true},(error,results)=>{
        if(error){
            res.status = 500;
            res.data = "Error Occured";
            callback(null, res);
        }else{
            res.status = 200;
            res.data = results;
            callback(null,res);
        }
    })
}

const getRestaurantOrders = async(msg,callback) => {
    let res= {};
    var restaurantID=msg.RestaurantID;
    Order.find({RestaurantID:restaurantID},async (error,results)=>{
        console.log(results);
        if(error){
            res.status = 500;
            res.data = "Error Occured";
            callback(null, res);
        }else{
            let data=[];
            let i=0;
            for(let order of results){
                let obj={};
                let wait =await Customer.findOne({CustomerID:order.CustomerID},(error,results)=>{
                    if(error){
                        res.status = 500;
                        res.data = "Error Occured";
                        callback(null, res);
                        return;
                    }else{
                        results.Password=undefined;
                        obj={
                            ...order._doc,
                            ...results._doc
                        }
                        data.push(obj);
                    }
                });
                if(i==results.length-1){
                    res.status = 200;
                    res.data = data;
                    callback(null,res);
                }
                i++;
            }
            
        }
    });
}

const updateDeliveryStatus = async(msg,callback) => {
    let res= {};
    let update= {};
    var details=msg;
    if(details.OrderPickUpStatus!==undefined){
        update["OrderPickUpStatus"]=details.OrderPickUpStatus;
        if(details.OrderPickUpStatus=="Picked up"){
            update["OrderStatus"]='Delivered';
        }
        else if(details.OrderPickUpStatus=="Cancelled"){
            update["OrderStatus"]='Cancelled';
        }
        else{
            update["OrderStatus"]='New Order';
        }
    }else{
        update['OrderDeliveryStatus']=details.OrderDeliveryStatus;
        if(details.OrderDeliveryStatus==="Delivered"){
            update["OrderStatus"]='Delivered';
        }
        else if(details.OrderDeliveryStatus=="Cancelled"){
            update["OrderStatus"]='Cancelled';
        }
        else{
            update["OrderStatus"]='New Order';
        }
    }
    Order.findOneAndUpdate({OrderID:details.OrderID},update,(error,results)=>{
        if(error){
            res.status = 500;
            res.data = "Error Occured";
            callback(null, res);
        }else{
            res.status = 200;
            res.data = "Update Successful";
            callback(null,res);
        }
    });
}

handle_request = (msg, callback) => {
    if(msg.path==="getOrderMenu"){
        delete msg.path;
        getOrderMenu(msg,callback);
    }
    else if(msg.path==="getRestaurantOrders"){
        delete msg.path;
        getRestaurantOrders(msg,callback);
    }
    else if(msg.path==="updateDeliveryStatus"){
        delete msg.path;
        updateDeliveryStatus(msg,callback);
    }
}

exports.handle_request = handle_request;