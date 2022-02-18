
var connection=require('../connection.js');
const {uuid} = require("uuidv4");
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports.customerLogin= async(req,res)=>{
    const {email,password}=req.body;
    await connection.query(`SELECT * from CustomerDetails`, async function(error,results){

        if(error){
            console.log("error "+error);
        }else{
           // console.log("Success");
            let authFlag=false;
            let details;
            
            for(let user of results){
               let match= await bcrypt.compare(password, user.Password);
                // console.log(user.Email,email,password,user.Password,match);
                    if(match && user.Email==email){
                        authFlag=true;
                        details=user;
                        break;
                    }
            }
            if(!authFlag){
                console.log("Error");
                res.statusCode=404;
                res.send("Invalid Credentials");
            }else{
                console.log("Here");
                res.statusCode=200;
                res.send(details);
            }
            
        }
    })
}
module.exports.customerSignup=async(req,res)=>{
    //console.log("request body",req.body);
    const {password,email,name}=req.body;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        let sql="INSERT INTO `CustomerDetails` (CustomerID,Password,Email,Name) VALUES ('"+uuid()+"','"+hash+"','"+email+"','"+name+"')";
       // console.log(sql);
        connection.query(sql,async function(error,results){
            if(error){
                res.statusCode=400;
                res.send(error);
            }else{
               // console.log("Call Here");
                res.statusCode=200;
               // console.log("Success");
                res.send("Customer SignUp Successful");
            }
        })
    });
    // console.log(genpassword);
    // bcrypt.compare(password, genpassword, function(err, result) {
    //     // result == true
    //     console.log("Compare",result);
    // });
   
}
 module.exports.updateCustomerProfile=async(req,res)=>{
    var sql='UPDATE CustomerDetails SET ';
    for (const [key, value] of Object.entries(req.body)) {
        if(key=="customerID") continue;
        sql+=key + "='" + value + "' ,";
      }
      sql=sql.slice(0,-1);
      sql+="WHERE CustomerID='"+req.body.customerID+"'";
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

module.exports.addToFavourites=async(req,res)=>{
    var details=req.body;
    var sql=`INSERT INTO FavouriteRestaurants VALUES ('${uuid()}','${details.customerID}','${details.restaurantID}')`;
    await connection.query(sql,async function(error,results){
        if(error){
            res.statusCode=404;
            res.send(error);
        }else{
            res.statusCode=200;
            res.send("Insertion Successful");
        }
    });
 }
 module.exports.getFavouriteRestaurants=async(req,res)=>{
     var sql=`Select * from RestaurantDetails where RestaurantID in (Select RestaurantID from FavouriteRestaurants where CustomerID="${req.query.customerID}");`
     //console.log(sql);
     await connection.query(sql,async function(error,results){
        if(error){
            res.statusCode=404;
            res.send(error);
        }else{
            res.statusCode=200;
            res.send(results);
        }
    });
 }

 module.exports.addAddress=async(req,res)=>{
     var details=req.body;
    var sql=`INSERT INTO Address(AddressID,CustomerID,Address) VALUES('${uuid()}','${details.customerID}','${details.address}')`;
    await connection.query(sql,async function(error,results){
        if(error){
            res.statusCode=404;
            res.send(error);
        }else{
            res.statusCode=200;
            res.send("Insertion Successful");
        }
    });
 };

 module.exports.getAddress=async(req,res)=>{
     var customerID=req.query.customerID;
     var sql=`SELECT Address from Address where CustomerID='${customerID}'`;
     //console.log(sql);
     await connection.query(sql,async function(error,results){
        if(error){
            res.statusCode=404;
            res.send(error);
        }else{
            res.statusCode=200;
            res.send(results);
        }
    });
 }

 module.exports.getCustomerOrders=async(req,res)=>{
     var CustomerID=req.query.CustomerID;
     let data={};
     var sql=`select t1.OrderID,CustomerID,t1.RestaurantID,Name,OrderStatus,Location,OrderDescription,NoOfItems,OrderTotal,OrderTime,OrderPickUp,OrderDelivery,OrderPickUpStatus,OrderDeliveryStatus,t1.Address from Orders t1 inner join RestaurantDetails t2 on t1.RestaurantID=t2.RestaurantID where CustomerID='${CustomerID}'`;
      //console.log(sql);
     var sql1=`select * from Orders t1 inner join OrderMenu t2 on t1.OrderID=t2.OrderID inner join Dishes t3 on t2.DishID=t3.DishID where CustomerID='${CustomerID}'`;
     await connection.query(sql,async function(error,results){
        if(error){
            res.statusCode=404;
            res.send("Error in Retrieving Data");
        }else{
            data["Orders"]=results;
            await connection.query(sql1,async function(error,results){
                if(error){
                    res.statusCode=404;
                    res.send(error);
                }else{
                    data["OrdersMenu"]=results;
                    res.statusCode=200;
                    res.send(data);
                }
            });
        }
    });
 }

 module.exports.placeCustomerOrder=async(req,res)=>{
    let details=req.body;
    let orderID=uuid();
    var sql=`INSERT into Orders (OrderID,RestaurantID,CustomerID,OrderStatus,OrderDescription,NoOfItems,OrderTotal,
        OrderTime,OrderPickUp,OrderDelivery,OrderPickUpStatus,OrderDeliveryStatus,Address) VALUES('${orderID}','${details.RestaurantID}'
        ,'${details.CustomerID}','${details.OrderStatus}','${details.Description}','${details.NoOfItems}','${details.OrderTotal}'
        ,'"${details.OrderTime}"','${details.OrderPickUp}','${details.OrderDelivery}','${details.OrderPickUpStatus}'
        ,'${details.OrderDeliveryStatus}','${details.Address}')`;
       // console.log(sql);
        
        await connection.query(sql,async function(error,results){
            if(error){
                res.statusCode=404;
                res.send("Error in Insertion");
            }else{
                const {menu}=details;
                for(let item of menu){
                   
                    var sql1=`INSERT into OrderMenu (ID,OrderID,DishID,Qty,OrderDishPrice) values('${uuid()}','${orderID}','${item.DishID}',${item.Qty},${item.DishPrice})`;
                   console.log(sql1);
                    await connection.query(sql1,async function(error,results){
                        if(error){
                            res.statusCode=404;
                            res.send("Error in Insertion");
                        }                        
                    })
                    
                }
                res.statusCode=200;
                res.send("Order Placed");
                
            }


        })

 }