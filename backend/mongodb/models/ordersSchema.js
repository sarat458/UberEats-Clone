const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var orderSchema=new Schema({
    OrderID:{type:String,required:true},
    RestaurantID:{type:String,required:true},
    CustomerID:{type:String,required:true},
    OrderStatus:{type:String,required:true},
    OrderDescription:{type:String,default:""},
    NoOfItems:{type:Number,required:true},
    OrderTotal:{type:Number,required:true},
    OrderTime:{type:String,required:true},
    OrderPickUp:{type:Number,default:0},
    OrderDelivery:{type:Number,default:0},
    OrderPickUpStatus:{type:String,default:""},
    OrderDeliveryStatus:{type:String,default:""},
    Address:{type:String,required:true},
    Menu:{type:Array,required:true,default:[]}
},
{
    versionKey: false
});
const customerModel = mongoose.model('Orders', orderSchema);
module.exports = customerModel;
