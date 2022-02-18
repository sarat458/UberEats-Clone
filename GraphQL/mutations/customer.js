const customer = require('../models/customerDetailsSchema');
var Restaurant = require('../models/restaurantDetailsSchema');
const Order=require('../models/ordersSchema');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {uuid} = require("uuidv4");
module.exports.customerLogin = async (email,password) => {
    try{
        let user = await customer.findOne({Email:email});
        if(!user){
            return { status : 404}
        }

        let match= await bcrypt.compare(password, user.Password);
        if(!match){
            return {status : 500}
       }
       user.status=200;
       return user;
    }
    catch(err){
        return { status: 404 };
    }
        

}

module.exports.customerSignup = async (name,email,password) => {
    console.log(name,email,password);
    bcrypt.hash(password, saltRounds, async function(err, hash) {
        let newCustomer = new customer({
            CustomerID:uuid(),
            Email:email,
            Password:hash,
            Name:name
        })
        try{
            newCustomer.save((error,results)=> {
                if(error){
                    return {status : 500};
                }else{
                    results.status=200;
                    return {status:200};
                }
            });
           
            
        }
        catch(e){
            console.log(e);
            return {status : 500};
        }

    });
}

module.exports.getCustomerProfile = async (customerID) => {
 try{
    let user = await customer.findOne({CustomerID: customerID});
    return user;
}
    catch(e){
        return {status : 500};
    }
}

module.exports.updateCustomerProfile = async (updateDetails) => {
    var filter={CustomerID:msg.customerID};
    var update={};
    for (const [key, value] of Object.entries(msg)) {
        if(key=="customerID") continue;
        update[key]=value;
    }
    customer.findOneAndUpdate(filter,update,async(error,results)=>{
        if(error){
            return {status : 500}
        }else{
            return {status : 200}
        }

    })
}

module.exports.getCustomerOrders = async (customerID) => {
    try{
        let orders = await Order.find({CustomerID:customerID});
        return orders;
    }
    catch(e){
        return {status : 500};
    }
}

module.exports.placeCustomerOrder = async (orderDetails) => {
    let details=orderDetails;
    let orderID=uuid();
    for(let item of details.menu){
        item["OrderID"]=orderID;
        item["OrderTotal"]=details.OrderTotal;
        item["OrderDishPrice"]=item.DishPrice;
        item["Address"]=details.Address;
        item["OrderDescription"]=details.Description;
        item["OrderStatus"]=details.OrderStatus;
    }
    let order=new Order({
        OrderID:orderID,
        RestaurantID:details.RestaurantID,
        CustomerID:details.CustomerID,
        OrderStatus:details.OrderStatus,
        OrderDescription:details.Description,
        NoOfItems:details.NoOfItems,
        OrderTotal:details.OrderTotal,
        OrderTime:details.OrderTime,
        OrderPickUp:details.OrderPickUp,
        OrderDelivery:details.OrderDelivery,
        OrderPickUpStatus:details.OrderPickUpStatus,
        OrderDeliveryStatus:details.OrderDeliveryStatus,
        Address:details.Address,
        Menu:details.menu
    });
    try{
        let save = Order.save();
        return {status : 200};
    }
    catch(e){
        return {status : 500};
    }
    
}

module.exports.getRestaurantsOnSearch = async (search,type) => {
    let filter={};
    if(type==="Veg"){
        filter["Veg"]=1;
    }else if(type==="Non veg"){
        filter["Nonveg"]=1;
    }else if(type==="Vegan"){
        filter["Vegan"]=1;
    }
    else if(type==="Pickup"){
        filter={
            ModeOfDelivery:{
                $in:[0,2]
            }
        }
    }else if(type==="Delivery"){
        filter["ModeOfDelivery"]={
                $in:[1,2]
        }
    }else{
        filter={
            Location:search
        }
    }
    try{
        let restaurants= await Restaurant.find(filter,{Password:false,_id:false});
        if(restaurants!==null && restaurants.length>0){
            return restaurants;
        }
        let rest= await Dish.find({DishName:search},{_id:false,RestaurantID:true}).distinct('RestaurantID');
        if(rest===null || rest.length==0){
            return {status : 404};
        }
        return rest;
    }
    catch(e){
        return {status : 500};
    }
}



