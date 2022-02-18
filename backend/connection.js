var mysql = require('mysql');
var constants=require('./config.json');
var connection = mysql.createPool({
    host : constants.DB.host,
    user: constants.DB.username,
    password: constants.DB.password,
    port:constants.DB.port,
    database:constants.DB.database
});
connection.getConnection((err)=>{
    if(err){
        throw 'Error occured ' +err;
    }
});
// connection.connect(function(err) {  
//     if (err) throw err;  
//     console.log("Connected!");  
//   });  
module.exports=connection;