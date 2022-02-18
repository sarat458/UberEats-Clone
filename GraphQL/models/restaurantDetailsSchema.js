const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var restaurantSchema= new Schema({
    RestaurantID:{type:String,required:true},
    Email:{type:String,required:true},
    Password:{type:String,required:true},
    Name:{type:String,required:true},
    Location:{type:String,required:true},
    ImageURL:{type:String,default:""},
    Description:{type:String,default:""},
    ContactInfo:{type:Number,default:""},
    Address:{type:String,default:""},
    ModeOfDelivery:{type:Number,default:2},
    Veg:{type:Number,default:0},
    Nonveg:{type:Number,default:0},
    Vegan:{type:Number,default:0},
    Timings:{type:String,default:""},
    Country : {type:String,default:""}
},
{
    versionKey: false
});
const userModel = mongoose.model('RestaurantDetails', restaurantSchema);
module.exports = userModel;
