const mysql=require("mysql")
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : 'password',       
  port: '3305',                   
  database: 'vuesocket' 
});
connection.connect();
module.exports=connection;