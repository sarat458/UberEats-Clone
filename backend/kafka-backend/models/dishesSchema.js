const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var dishSchema=new Schema({
    DishID:{type:String,required:true},
    RestaurantID:{type:String,required:true},
    DishName:{type:String,required:true},
    MainIngredients:{type:String,required:true},
    DishImageURL:{type:String,default:""},
    DishPrice:{type:Number,required:true},
    Description:{type:String,default:""},
    DishCategory:{type:String,required:true},
    DishType:{type:String,required:true}
},
{
    versionKey: false
});
const customerModel = mongoose.model('Dishes', dishSchema);
module.exports = customerModel;
