const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var favRestaurants= new Schema({
    ID:{type:String,required:true},
    CustomerID:{type:String,required:true},
    RestaurantID:{type:String,required:true}
},
{
    versionKey: false
});

const customerModel = mongoose.model('FavouriteRestaurants', favRestaurants);
module.exports = customerModel;
