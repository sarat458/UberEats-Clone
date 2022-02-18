var assert = require('chai').assert;
var app=require('../indexMongo.js');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;
var agent = require('chai').request.agent(app);
ROOT_URL = "http://localhost:3001"

describe("Get-- Get Restaurants",()=>{
    it("/getRestaurants",(done)=>{
        chai.request.agent(app)
        .get("/getRestaurants")
        .then(function (res){
            console.log(res.status);
            expect(res).to.have.status(200);
            done();
        })
        .catch((e) => {
            done(e);
          });
    })
})

describe("Post-- Customer Login",()=>{
    it("/customerLogin",(done)=>{
        chai.request.agent(app)
        .post("/customerLogin")
        .send({email:"sakethgali@gmail.com",password:"Abc@123456"})
        .then(function(res){
            console.log(res.status);
            expect(res).to.have.status(200);
            done();
        })
        .catch((e) => {
            done(e);
          });
    })
})
describe("Post-- Restaurant Login",()=>{
    it("/restaurantLogin",(done)=>{
        chai.request.agent(app)
        .post("/restaurantLogin")
        .send({email:"greatindian@gmail.com",password:"great123"})
        .then(function(res){
            console.log(res.status);
            expect(res).to.have.status(200);
            done();
        })
        .catch((e) => {
            done(e);
          });
    })
})

describe("Get-- Get Restaurant Orders",()=>{
    it("/getRestaurantOrders",(done)=>{
        chai.request.agent(app)
        .get("/getRestaurantOrders")
        .send({RestaurantID:"e65395b2-06b1-49dd-af04-c0115b53fafe"})
        .then(function (res){
            console.log(res.status);
            expect(res).to.have.status(200);
            done();
        })
        .catch((e) => {
            done(e);
          });
    })
})

describe("Get-- Get Customer Profile",()=>{
    it("/getCustomerProfile",(done)=>{
        chai.request.agent(app)
        .get("/getCustomerProfile")
        .send({customerID:"f12ed8a1-0956-4c5f-b091-495b65f998dc"})
        .then(function (res){
            console.log(res.status);
            expect(res).to.have.status(200);
            done();
        })
        .catch((e) => {
            done(e);
          });
    })
})


