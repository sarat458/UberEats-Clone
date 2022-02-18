var connection=require('../connection.js');
const {uuid} = require("uuidv4");
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports.restaurantLogin=async(req,res)=>{
    const {email,password}=req.body;
    await connection.query('SELECT * from RestaurantDetails',async (error,results)=>{
        if(error){
            console.log("error "+error);
        }else{
           // console.log("Success");
            let authFlag=false;
            let details=null;
            
             for(let user of results){
                    let match= await bcrypt.compare(password, user.Password);
                    if(match && user.Email==email){
                        authFlag=true;
                        details=user;
                        break;
                    }
            }
            if(!authFlag){
                res.statusCode=400;
                res.send("Invalid Credentails");
            }else{
                res.statusCode=200;
                res.send(details);
            }
            }
    })

}
module.exports.restaurantSignup=async(req,res)=>{
    const {password,email,name,location}=req.body;
    
    //console.log(sql);
    bcrypt.hash(password, saltRounds, function(err, hash) {
        let sql="INSERT INTO `RestaurantDetails` (RestaurantID,Password,Email,Name,Location,ModeOfDelivery) VALUES ('"+uuid()+"','"+hash+"','"+email+"','"+name+"','"+location+"',2)";
         connection.query(sql,async function(error,results){
        if(error){
            res.statusCode=400;
            res.send(error);
        }else{
            res.statusCode=200;
            res.send("Restaurant Signup Successful");
        }
    })
});
}

module.exports.restaurantProfile=async(req,res)=>{
    var restaurantID=req.query.restaurantID;
    await connection.query("SELECT * from RestaurantDetails WHERE RestaurantID="+restaurantID,async function(error,results){
        if(error){
            res.statusCode=400;
            res.send(error);
        }else{
            res.statusCode=200;
            res.send(results);
        }
    })
}
module.exports.updateRestaurantProfile=async(req,res)=>{
    var details=req.body;
    //console.log(details);
    var sql='UPDATE RestaurantDetails SET ';
    for (const [key, value] of Object.entries(details)) {
        if(key=="RestaurantID") continue;
        sql+=key + "='" + value + "' ,";
      }
      sql=sql.slice(0,-1);
      sql+="WHERE RestaurantID='"+details.RestaurantID+"'";
      //console.log(sql);
      await connection.query(sql,async function(error,results){
        if(error){
            res.statusCode=400;
            res.send(error);
        }else{
            res.statusCode=200;
            res.send(results);
        }
      })
}
module.exports.getOrderMenu=async(req,res)=>{
    let {OrderID}=req.query;
    var sql=`select DishName,MainIngredients,Description,DishCategory,DishType,DishPrice,Qty from OrderMenu t1 inner join Dishes t2 on t1.DishID=t2.DishID where OrderID="${OrderID}"`
    await connection.query(sql,async function(error,results){
        if(error){
            res.statusCode=400;
            res.send(error);
        }else{
            res.statusCode=200;
            res.send(results);
        }
      })

}
module.exports.addDish=async(req,res)=>{
    var dishDetails=req.body;
    let sql=`INSERT INTO Dishes (DishID,RestaurantID,DishName,MainIngredients,DishImageURL,DishPrice,Description,DishCategory,DishType) 
        VALUES ('${uuid()}','${dishDetails.restaurantID}','${dishDetails.DishName}','${dishDetails.MainIngredients}','${dishDetails.DishImageURL}',
        ${dishDetails.DishPrice},'${dishDetails.Description}','${dishDetails.DishCategory}','${dishDetails.DishType}')`;
        //console.log(sql);
    await connection.query(sql,async function(error,results){
        if(error){
            res.statusCode=404;
            res.send(error);
        }else{
            
            res.statusCode=200;
            res.send(results);
        }
    })
}
module.exports.updateDish=async(req,res)=>{
    var dishDetails=req.body;
    var sql='UPDATE Dishes SET ';
    for (const [key, value] of Object.entries(dishDetails)) {
        if(key=="DishID") continue;
        sql+=key + "='" + value + "' ,";
      }
      sql=sql.slice(0,-1);
      sql+="WHERE DishID='"+dishDetails.DishID+"'";
     // console.log(sql);
      await connection.query(sql,async function(error,results){
        if(error){
            res.statusCode=404;
            res.send(error);
        }else{
            
            res.statusCode=200;
            res.send(results);
        }
      })
}

module.exports.getRestaurantOrders=async(req,res)=>{
    var restaurantID=req.query.RestaurantID;
    var sql=`select OrderID,RestaurantID,Orders.CustomerID,OrderStatus,OrderDescription,OrderTime,OrderTotal,OrderPickUp,OrderDelivery,OrderPickUpStatus,
    OrderDeliveryStatus,Address,Name,Email,ImageURL,DateOfBirth,City,PhoneNumber,State,Country,Nickname
     from Orders inner join CustomerDetails on Orders.CustomerID=CustomerDetails.CustomerID 
     where RestaurantID="${restaurantID}";`
     //console.log(sql);
    await connection.query(sql,async function(error,results){
        if(error){
            res.statusCode=404;
            res.send(error);
        }else{
            
            res.statusCode=200;
            res.send(results);
        }
    })
}
module.exports.updateDeliveryStatus=async(req,res)=>{
    var details=req.body;
    var sql;
    if(details.OrderPickUpStatus!==undefined){
         sql=`UPDATE Orders set OrderPickUpStatus='${details.OrderPickUpStatus}'`;
         if(details.OrderPickUpStatus=="Picked up"){
             sql+=`,OrderStatus='Delivered'`;
         }
         sql+=`where OrderID='${details.OrderID}'`;
    }else{
         sql=`UPDATE Orders set OrderDeliveryStatus='${details.OrderDeliveryStatus}'`;
         if(details.OrderDeliveryStatus==="Delivered"){
            sql+=`,OrderStatus='Delivered'`;
         }
         
         sql+=`where OrderID='${details.OrderID}'`;
    }
   console.log(sql);
    await connection.query(sql,async function(error,results){
        if(error){
            res.statusCode=404;
            res.send(error);
        }else{
            
            res.statusCode=200;
            res.send("Update Successful");
        }
    })
}
module.exports.updateOrderStatus=async(req,res)=>{
    var orderDetails=req.body;
    if(orderDetails.orderMode=='pickUp'){
        var sql=`UPDATE Orders SET OrderPickUpStatus='${orderDetails.status}'   where OrderID='${orderDetails.orderID}'`;
        await connection.query(sql,async function(error,results){
            if(error){
                res.statusCode=404;
                res.send(error);
            }else{
                
                res.statusCode=200;
                res.send("Update Successful");
            }
        });
    }else{
        var sql=`UPDATE Orders SET OrderDeliveryStatus='${orderDetails.status}'   where OrderID='${orderDetails.orderID}'`;
        await connection.query(sql,async function(error,results){
            if(error){
                res.statusCode=404;
                res.send(error);
            }else{
                
                res.statusCode=200;
                res.send("Update Successful");
            }
        });
    }
}
module.exports.getCustomerProfile=async (req,res)=>{
    var customerID=req.query.customerID;
    var sql=`SELECT * from CustomerDetails WHERE CustomerID='${customerID}'`;
    await connection.query(sql,async function(error,results){
        if(error){
            res.statusCode=404;
            res.send(error);
        }else{
            
            res.statusCode=200;
            res.send(results);
        }
    })
}

module.exports.getRestaurantMenu =async(req,res)=>{
    var RestaurantID=req.query.RestaurantID;
    var sql=`select DishName,MainIngredients,DishImageURL,DishPrice,t2.Description,DishCategory,t1.RestaurantID,DishID,DishType from RestaurantDetails t1 INNER JOIN Dishes t2 ON t1.RestaurantID=t2.RestaurantID where t1.RestaurantID='${RestaurantID}';`;
    await connection.query(sql,async function(error,results){
        if(error){
            res.statusCode=404;
            res.send(error);
        }else{
            
            res.statusCode=200;
            res.send(results);
        }
    })
}