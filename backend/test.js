var assert = require('chai').assert;
var app=require('./indexMongo.js');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;
var agent = require('chai').request.agent(app);
var JWTtoken='JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkwMWMwZDI3Mzk1MDYyNDA5OWY3MmYiLCJ1c2VybmFtZSI6I'
ROOT_URL = "http://localhost:3001"

describe("Get-- Get Restaurants",()=>{
    it("/getRestaurants",(done)=>{
        chai.request.agent(app)
        .get("/getRestaurants")
        .set('authorization',JWTtoken)
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
        .set('authorization',JWTtoken)
        .send({email:"user1@gmail.com",password:"user123"})
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
        .set('authorization',JWTtoken)
        .send({email:"pandaexpress@gmail.com",password:"panda@123"})
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
        .set('authorization',JWTtoken)
        .send({RestaurantID:"2701ae18-2b53-4652-b0ab-e39ee7aa195f"})
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

describe("Get-- Get Order's Menu",()=>{
    it("/getOrderMenu",(done)=>{
        chai.request.agent(app)
        .get("/getOrderMenu")
        .set('authorization',JWTtoken)
        .send({OrderID:"40006f8f-f077-4080-931b-8d9cc22134aa"})
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


