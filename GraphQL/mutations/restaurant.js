const bcrypt = require('bcrypt');
const saltRounds = 10;
const {uuid} = require("uuidv4");
var Restaurant = require('../models/restaurantDetailsSchema');
const Dish = require('../models/dishesSchema');
const Order=require('../models/ordersSchema');
module.exports.restaurantSignup=async(name,email,password,location)=>{
    bcrypt.hash(password, saltRounds, async function(err, hash) {
    let newRestaurant = new Restaurant({
        RestaurantID:uuid(),
        Email:email,
        Password:hash,
        Name:name,
        Location:location
    })
    try{
        newRestaurant.save((error,results)=> {
            if(error){
                return {status : 500};
            }else{
                results.status=200;
                return {status : 200};
            }
        });
       
        
    }
    catch(e){
        console.log(e);
        return {status : 500};
    }

});

}


module.exports.restaurantLogin = async(email,password) => {
    try{
        let restaurant = await Restaurant.findOne({Email:email});
        if(!restaurant){
            return { status : 404}
        }

        let match= await bcrypt.compare(password, restaurant.Password);
        if(!match){
            return {status : 500}
       }
       restaurant.status=200;
       return restaurant;
    }
    catch(err){
        return { status: 404 };
    }
}


module.exports.getRestaurantProfile = async (RestaurantID) => {
    try{
        let restaurant = await Restaurant.findOne({RestaurantID:RestaurantID});
        restaurant.status=200;
        return restaurant;
        
    }
    catch(e){
        return { status: 500 };
    }
}

module.exports.updateRestaurantProfile = async (updateDetails) => {
    var filter={RestaurantID:updateDetails.RestaurantID};
    var update={};
    for (const [key, value] of Object.entries(updateDetails)) {
        if(key=="RestaurantID") continue;
        update[key]=value;
    }
    try{
        let updated =await Restaurant.findOneAndUpdate(filter,update);
        return {status : 200};
    }
    catch(e){
        return {status : 500};
    }
}

module.exports.addDish = async (dishDetails) => {
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
    try{
        let save = dish.save();
        return {status : 200};
    }
    catch(e){
        return {status : 500};
    }
}

module.exports.updateDish= async (dishDetails) => {
    var update={};
    for (const [key, value] of Object.entries(dishDetails)) {
        if(key=="DishID") continue;
        update[key]=value;
    }
    try{
        update = await Dish.findOneAndUpdate({DishID:dishDetails.DishID},update);
        return {status : 200};
    }
    catch(e){
        return {status : 500};
    }
}

module.exports.getRestaurantMenu = async (RestaurantID) => {
    try{
        let dishes = Dish.find({RestaurantID:RestaurantID});
        return dishes;
    }
    catch(e){
        return {status : 500};
    }
}

module.exports.getOrderMenu = async (OrderID) => {
    try{
        let menu = await Order.findOne({OrderID:OrderID},{_id:false,Menu:true});
        return menu.Menu;
    }
    catch(e){
        return {status : 500};
    }
}

module.exports.getRestaurantOrders = async (RestaurantID) => {
    try{
        let orders = await Order.find({RestaurantID:RestaurantID});
        return orders;
    }
    catch(e){
        return {status : 500};
    }
}

module.exports.updateDeliveryStatus = async (updateDetails) => {
    try{
        let update= {};
        var details=updateDetails;
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
        update = await  Order.findOneAndUpdate({OrderID:details.OrderID},update);
        return {status : 200,success : "Yes"};

    }
    catch(e){
        return {status : 500};
    }
}