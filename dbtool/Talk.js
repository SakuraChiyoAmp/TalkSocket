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
 PostTalk:async function  (UserName,OtherUserName,Message,Date,Flag){
        let FinalResult={}
        let sqlUserName=`insert into message (UserName,OtherUserName,Message,Date,Flag) values ("${UserName}","${OtherUserName}","${Message}",${Date},${Flag})`;
         const  queryUserName=function checkUserName(sql){
           return new Promise((resolve,reject)=>{
            connection.query(sql,function(err,result){
              console.log(sql);
              if (err){
                console.log("插入出错");
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
 GetMessageList:async function(UserName){
  let FinalResult=[];
  let sqlUserName=`select UserName from Message where flag=0 and OtherUserName="${UserName}"`;
   const  queryUserName=function checkUserName(sql){
     return new Promise((resolve,reject)=>{
      connection.query(sql,function(err,result){
        console.log(sql);
        if (err){
          console.log("插入出错");
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
 GetTalkMessage:async function(UserName,OtherUserName){
  let FinalResult=[];
  let sqlUserName=`select * from Message where UserName="${UserName}" and OtherUserName="${OtherUserName}" order by Date`;
  let sqlOtherUserName=`select * from Message where UserName="${OtherUserName}" and OtherUserName="${UserName}" order by Date`;
  const  queryUserName=function checkUserName(sql){
     return new Promise((resolve,reject)=>{
      connection.query(sql,function(err,result){
        console.log(sql);
        if (err){ 
          console.log("插入出错");
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
    FinalResult.push(...result);
  })
  return FinalResult;  
 },
 ClearMessage:async function(UserName,OtherUserName){
  let FinalResult=[];
  let sqlUserName=`update message set flag=1 where UserName="${UserName}" and OtherUserName="${OtherUserName}"`;
  let sqlOtherUserName=`update message set flag=1 where OtherUserName="${UserName}" and UserName="${OtherUserName}"`;
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
  let resultOtherUserName=await queryUserName(sqlOtherUserName).then(result=>{
    // FinalResult.push(result);
  })
  return FinalResult;  
 }

  
}