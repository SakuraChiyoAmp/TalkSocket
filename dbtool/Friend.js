const mysql=require("mysql")
// var connection = mysql.createConnection({     
//   host     : 'localhost',       
//   user     : 'root',              
//   password : 'password',       
//   port: '3305',                   
//   database: 'vuesocket' 
// });
// connection.connect();
const connection=require("./connection");
module.exports ={
 AddFriend:async function  (UserName,OtherUserName){
        let FinalResult={}
        let sqlUserName=`insert into Friend (UserName,OtherUserName,Flag) values ("${UserName}","${OtherUserName}",0)`;
         const  queryUserName=function checkUserName(sql){
           return new Promise((resolve,reject)=>{
            connection.query(sql,function(err,result){
              // console.log(sql);
              if (err){
                console.log("查询出错");
              }else{
                resolve(result);
              }
           })
           })
          } 
        let resultUserName=await queryUserName(sqlUserName).then(result=>{
          FinalResult=result;
        }); 
        return FinalResult;
      },
 GetFriendRequestList:async function(UserName){
  let FinalResult=[]
  let sqlUserName=`SELECT UserName FROM friend WHERE OtherUserName="${UserName}" and flag=0`;
   const  queryUserName=function checkUserName(sql){
     return new Promise((resolve,reject)=>{
      connection.query(sql,function(err,result){
        console.log(sql);
        if (err){
          console.log("查询出错");
        }else{
          resolve(result);
        }
     })
     })
    } 
  let resultUserName=await queryUserName(sqlUserName).then(result=>{
    FinalResult=result;
  }); 
  return FinalResult;  
 },
 AddFriendSuccess:async function(UserName,OtherUserName){
  let FinalResult={}
  let sqlUserName=`update friend set flag=1 where UserName="${UserName}" and OtherUserName="${OtherUserName}"`;
  let sqlOtherUserName=`update friend set flag=1 where UserName="${OtherUserName}" and OtherUserName="${UserName}"`;
   const  queryUserName=function checkUserName(sql){
     return new Promise((resolve,reject)=>{
      connection.query(sql,function(err,result){
        // console.log(sql);
        if (err){
          console.log("查询出错");
        }else{
          resolve(result);
        }
     })
     })
    } 
  let resultUserName=await queryUserName(sqlUserName).then(result=>{
    FinalResult=result;
  }); 
  let resultOtherUserName=await queryUserName(sqlOtherUserName).then(result=>{
    FinalResult=result;
  })
  return FinalResult;
 }  ,
 DeleteFriend:async function(UserName,OtherUserName){
  let FinalResult={};
  let OtherFinalResult={};
  let sqlUserName=`delete from Friend where UserName="${UserName}" and OtherUserName="${OtherUserName}"`;
  let sqlOtherUserName=`delete from Friend where OtherUsername="${UserName}" and UserName="${OtherUserName}"`;
   const  queryUserName=function checkUserName(sql){
     return new Promise((resolve,reject)=>{
      connection.query(sql,function(err,result){
        console.log(sql);
        if (err){
          console.log("查询出错");
        }else{
          resolve(result);
        }
     })
     })
    } 
  // let resultUserName=await queryUserName(sqlUserName).then(result=>{
  //   FinalResult=result;
  // }); 
  // let resultOtherUserName=await queryUserName(sqlOtherUserName).then(result=>{
    
  // }); 
  let resultUserName=await Promise.all([queryUserName(sqlUserName),queryUserName(sqlOtherUserName)]);
  return FinalResult; 
 }


  
}