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
  GetUserInfo:async function  (UserName){
        let FinalResult={}
        let sqlUserName=`SELECT UserName,NickUserName,HeadImage FROM userinfo WHERE UserName="${UserName}"`;
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
          FinalResult=result[0];
        }); 
        return FinalResult;
      },
  AddUserInfo(UserName,NickUserName,Password,HeadImage){
    
  },
  GetUserFriend:async function(UserName){
    let FinalResult=[]
    let sqlUserName=`SELECT OtherUserName FROM Friend WHERE UserName="${UserName}" and flag=1`;
    let sqlOtherUserName=`SELECT UserName FROM Friend WHERE  OtherUserName="${UserName}" and flag=1`;
     const  queryUserName=async function checkUserName(sql){
       return new Promise((resolve,reject)=>{
        //  console.log(sql);
        connection.query(sql,function(err,result){ 

          if (err){  
            console.log("查询出错"); 
          }else{
            resolve(result);
          }
       })
       })
      } 
    let resultUserName=await queryUserName(sqlUserName).then(result=>{
      for (let i of result){
        let friend={};
        console.log("别人的名字"+i.OtherUserName);
         friend.UserName=i.OtherUserName;
        FinalResult.push(friend); 
      }
    });
    let resulOtherUserName=await queryUserName(sqlOtherUserName).then(result=>{
       let friend={};
       for (let i of result){
         console.log("自己的名字"+i.UserName)
         friend.UserName=i.UserName;
       FinalResult.push(friend); 
      } 
  })
  let re=[];
      for (let i of FinalResult){
        let f=await this.GetUserInfo(i.UserName).then(result=>{
          i=result;
          console.log(result.HeadImage);
          re.push(result);
        })
      }
      let obj={} 
  let res=re.reduce((cur,next)=>{
    obj[next.UserName]?"":obj[next.UserName]=true&&cur.push(next);
    return cur;
  },[]) 
    return res; 
  },
  SearchFriend:async function(UserName,OtherUserName){
    let FinalResult=[]
    let sqlUserName=`SELECT UserName from userinfo WHERE UserName like "%${OtherUserName}" or UserName like "${OtherUserName}%" or UserName like "%${OtherUserName}%"`;
     const  queryUserName=async function checkUserName(sql){
       return new Promise((resolve,reject)=>{
         console.log(sql);
        connection.query(sql,function(err,result){ 
          if (err){    
            console.log("查询出错"); 
          }else{
            resolve(result);
          }
       })
       })
      } 
    let resultUserName=await queryUserName(sqlUserName).then(result=>{
      for (let i of result){
        let friend={};
        console.log("别人的名字"+i.UserName);
         friend.UserName=i.UserName;
        FinalResult.push(friend); 
      }
    });

  let re=[];
      for (let i of FinalResult){
        let f=await this.GetUserInfo(i.UserName).then(result=>{
          i=result;
          console.log(result.HeadImage);
          re.push(result);
        })
      }
      let obj={} 
  let res=re.reduce((cur,next)=>{
    obj[next.UserName]?"":obj[next.UserName]=true&&cur.push(next);
    return cur;
  },[]) 
    return res; 
  },
  GetIfFriend:async function(UserName,OtherUserName){
    let FinalResult=0;
    let lengthOne=0;
    let lengthTwo=0;
    let sqlUserName=`SELECT * FROM friend WHERE OtherUserName="${UserName}" and flag=1 and UserName="${OtherUserName}"`;
    let sqlOtherUserName=`SELECT * FROM friend WHERE OtherUserName="${OtherUserName}" and flag=1 and Username="${UserName}"`;
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
           if (result.length!=0){
             lengthOne=1;
           }else{
             lengthOne=0;
           }
    }); 
    let resulOtherUserName=await queryUserName(sqlOtherUserName).then(result=>{
           if (result.length!=0){
             lengthTwo=1;
           }else{
             lengthTwo=0;
           }
    })
    // console.log("1++"+lengthOne);
    // console.log("2++"+lengthTwo);
    return lengthOne||lengthTwo;    
  },
  LogOut:async function(UserName){
    let FinalResult={}
    let sqlUserName=`DELETE FROM Token where UserName="${UserName}"`;
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
  ChangeNickUserName:async function(UserName,NickUserName){
    let FinalResult={}
    let sqlUserName=`Update userinfo set NickUserName="${NickUserName}" where UserName="${UserName}"`;
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
  }
 

}