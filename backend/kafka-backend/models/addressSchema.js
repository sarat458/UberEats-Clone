const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var addressSchema=new Schema({
    AddressID:{type:String,required:true},
    CustomerID:{type:String,required:true},
    Address:{type:String,required:true}
},
{
    versionKey: false
});
const customerModel = mongoose.model('Address', addressSchema);
module.exports = customerModel;
