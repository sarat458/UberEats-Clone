"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var { secret } = require("../mongoConfig");
const Customer = require('../mongodb/models/customerDetailsSchema');
const Restaurant = require('../mongodb/models/restaurantDetailsSchema');
// Setup work and export for the JWT passport strategy
function auth() {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secret
    };

    //console.log("Passport",opts);
    //console.log("Payload",jwt_payload);
    passport.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
            const user_id = jwt_payload._id;
            console.log("payload",jwt_payload,user_id);
            if(jwt_payload.type==="customer"){
                Customer.findById(user_id, (err, results) => {
                    console.log("results and error",results,err);
                    if (err) {
                        return callback(err, false);
                    }
                    if (results) {
                        callback(null, results);
                    }
                    else {
                        callback(null, false);
                    }
                });
            }else{
                Restaurant.findById(user_id, (err, results) => {
                    console.log("results and error",results,err);
                    if (err) {
                        return callback(err, false);
                    }
                    if (results) {
                        callback(null, results);
                    }
                    else {
                        callback(null, false);
                    }
                });
            }
            
        })
    )
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });


