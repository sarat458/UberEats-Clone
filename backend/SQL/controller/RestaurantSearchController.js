var connection=require('../connection.js');
const {uuid} = require("uuidv4");
module.exports.getRestaurantBasedOnLocation=async(req,res)=>{
    var {search,type}=req.query;
   // console.log(search,type);
    var sql;
    if(type==="Veg"){
        sql=`SELECT RestaurantID,Name,Location,Description,ContactInfo,Timings,Address,ImageURL,ModeOfDelivery from RestaurantDetails where Veg=1`; 
    }
    else if(type==="Non veg"){
        sql=`SELECT RestaurantID,Name,Location,Description,ContactInfo,Timings,Address,ImageURL,ModeOfDelivery from RestaurantDetails where Nonveg=1`; 
    }
    else if(type==="Vegan"){
        sql=`SELECT RestaurantID,Name,Location,Description,ContactInfo,Timings,Address,ImageURL,ModeOfDelivery from RestaurantDetails where Vegan=1`; 
    }
    else if(type=="Pickup"){
       sql=`SELECT RestaurantID,Name,Location,Description,ContactInfo,Timings,Address,ImageURL,ModeOfDelivery from RestaurantDetails where ModeOfDelivery=${search} OR ModeOfDelivery=2`; 
    }else if(type=="Delivery"){
        sql=`SELECT RestaurantID,Name,Location,Description,ContactInfo,Timings,Address,ImageURL,ModeOfDelivery from RestaurantDetails where ModeOfDelivery=${search} OR ModeOfDelivery=2`;
    }else{
        sql=`SELECT RestaurantID,Name,Location,Description,ContactInfo,Timings,Address,ImageURL,ModeOfDelivery from RestaurantDetails where Location='${search}'`;
    }
   console.log(sql);
    
    var sql1=`Select t1.RestaurantID,Name,Location,t1.Description,ContactInfo,Timings,Address,t1.ImageURL,ModeOfDelivery from RestaurantDetails t1 inner join Dishes t2 on t1.RestaurantID=t2.RestaurantID where DishName='${search}';`;
   // console.log(sql1);
    await connection.query(sql,async function(error,results){
        if(error){
          //  console.log("Here");
            res.statusCode=404;
            res.send(error);
        }else{
           // console.log(results);
            if(results.length>0){
                res.statusCode=200;
                res.send(results);
            }else{
                await connection.query(sql1,async function(error,results){
                    if(error){
                        res.statusCode=404;
                        res.send(error);
                    }else{
                        res.statusCode=200;
                        res.send(results);
                    }
                });
            }
        }
    });
}

module.exports.getRestaurants=async(req,res)=>{
    await connection.query(`SELECT RestaurantID,Name,Location,Description,ContactInfo,Timings,Address,ImageURL,ModeOfDelivery from RestaurantDetails`,async(error,results)=>{
        if(error){
            res.statusCode=404;
            res.send(error);
        }else{
            res.statusCode=200;
            res.send(results);
        }
    })
}
