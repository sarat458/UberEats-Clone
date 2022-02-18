const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var customerSchema= new Schema({
    CustomerID:{type:String,required:true},
    Email:{type:String,required:true},
    Password:{type:String,required:true},
    Name:{type:String,required:true},
    ImageURL:{type:String,default:""},
    DateOfBirth:{type:String,default:""},
    City:{type:String,default:""},
    State:{type:String,default:""},
    Country:{type:String,default:""},
    Nickname:{type:String,default:""},
    PhoneNumber:{type:String,default:""}
},
{
    versionKey: false
});

const customerModel = mongoose.model('CustomerDetails', customerSchema);
module.exports = customerModel;
