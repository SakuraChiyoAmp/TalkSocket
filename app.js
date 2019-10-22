const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const Router=require("koa-router");
const router=new Router();
const cors=require("koa2-cors")
const server=require("http").createServer(app.callback());
const io=require("socket.io")(server);
const index = require('./routes/index')
const users = require('./routes/users')
//token
const createToken=require("./token/createToken");
const checkToken=require("./token/checkToken");
//websocket
var client=new Map();
server.listen(3001,()=>{
  console.log("listening");
})
io.on("connection",(socket)=>{
  socket.on("reconnect",data=>{
    console.log("重新连接"+socket.id);
  })
  console.log("开始连接");
  // console.log("这个socketid是"+socket.id);
  // console.log("这个链接的room"+socket.rooms);
  socket.on("SocketLogin",(data)=>{
     socket.id=data;
     client.set(socket.id,socket);
     console.log("登录后的id"+socket.id);
  })
  socket.on("AddFriendSocket",data=>{
      let target=client.get(data);
      if (target!=undefined){
        console.log("要向目标用户发送请求了"+data);
        target.emit("ReceiveFriendSocket",socket.id);
      }else{
        console.log("用户不在线延迟发送好友请求");
      }

  })
  socket.on("PostTalkSocket",data=>{
    console.log("执行了");
    console.log(data.UserName);
    let target=client.get(data.OtherUserName);
     if (target!=null){
      target.emit("GetTalkSocket",data);
     }else{
      Talk.PostTalk(data.UserName,data.OtherUserName,data.Message,data.Date,0);
     }
  })
  socket.on("send",(data)=>{
    console.log("发过来的消息是"+data);
    io.emit("receive",data);
  });
  socket.on("regist",(data)=>{
    console.log("新用户的id是"+data);
    socket.id=data;
    client[data]=socket;
  })
  socket.on("talk",(data)=>{
    console.log("data是"+data);
    data=data;
    var id=data.id;
    var content=data.content;
    var target=client[id];
    console.log(target);
    console.log("用户名"+id); 
    console.log("内容是"+content);
    target.emit("talkto",content);
  })
  socket.on("disconnect",(data)=>{
    client.delete(socket.id);
    console.log("断开连接");
  });
  socket.on("JoinRoom",data=>{
    console.log("接受到的房间名是"+data);
    socket.join(data);
  });
  socket.on("RoomTalk",data=>{
    console.log("要给房间们说的内容是"+data);
    socket.broadcast.to("group").emit("roomreceive",data);
  })
})
io.on("reconnection",(socket)=>{
  console.log("出发了重新连接"+socket.id);
})
// error handler
onerror(app)
 
//数据库相关
const UserInfo=require("./dbtool/UserInfo");
const Friend=require("./dbtool/Friend")
const Talk=require("./dbtool/Talk")
router.get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
  })
router.post("/post",async(ctx,next)=>{
   console.log(ctx.request.body);
  ctx.body={
    state:"success"
  }
})
router.get("/get",async(ctx,next)=>{
   console.log(ctx.request.query);
   ctx.body={
     state:"success"
   }
})

//数据库
const mysql=require("mysql")
const connection=require("./dbtool/connection");
// var connection = mysql.createConnection({     
//   host     : 'localhost',       
//   user     : 'root',              
//   password : 'password',       
//   port: '3305',                   
//   database: 'vuesocket' 
// });
// connection.connect();

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(cors({credentials:true}));
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app
  .use(router.routes())
  .use(router.allowedMethods());
app.use(views(__dirname + '/views', { 
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => { 
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
//解决文件上传
const multer=require("koa-multer")
var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
//加载配置
const upload = multer({ storage: storage });

app.use(checkToken);
// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});


//post请求要用到的接口
router.post('/SignUp', upload.array('avatar', 1), async (ctx) => {
  let UserName=ctx.query.username;
  let NickUserName=ctx.query.nickusername;
  let Password=ctx.query.pass;
  console.log("接收到了pass"+Password);
  console.log("接收到了usernam"+UserName)
  console.log("收到的文件的信息"+ctx.req.files[0].filename);
    let sqlUserName=`SELECT UserName FROM USERINFO WHERE UserName="${UserName}"`;
     const queryUserName=function checkUserName(sql){
       return new Promise((resolve,reject)=>{
        connection.query(sql,function(err,result){
          if (err){
            console.log("查询出错");
          }else{
            resolve(result);
          }
       })
       })
     }
    let resultUserName=await queryUserName(sqlUserName);
    console.log(typeof resultUserName)
    console.log(resultUserName[0])
    console.log(resultUserName.length);
    if (resultUserName.length!=0){
      ctx.body={
        state:"该用户名已被注册",
      }
    }else{
         let filename="http://localhost:3000/images/"+ctx.req.files[0].filename;
         let sql=`insert INTO USERINFO (USERNAME,PASSWORD,HEADIMAGE,NICKUSERNAME) VALUES ("${UserName}","${Password}","${filename}","${NickUserName}")`;
         let queryRegist=function checkRegist(sql){
             return new Promise((resolve,reject)=>{
              connection.query(sql,function (err, result) {
                if(err){
                 console.log('[INSERT ERROR] - ',err.message);
                 return;
                }else{
                  resolve(result);
                }    
            });
          })
        }
        let resultRegist=await  queryRegist(sql);      
        if (resultRegist.affectedRows!=0){
          ctx.body={
            state:"success"
          }
        }
    }
}) 
//登录
router.post("/Login",async(ctx,next)=>{
  console.log(ctx.request.body.username);
  console.log(ctx.request.body.pass);
  let UserName=ctx.request.body.username;
  let Password=ctx.request.body.pass;
  let sqlUserName=`SELECT Password FROM USERINFO WHERE UserName="${UserName}"`;
const queryUserName=function checkUserName(sql){
  return new Promise((resolve,reject)=>{
   connection.query(sql,function(err,result){ 
     if (err){
       console.log("查询出错");
     }else{
       resolve(result);
     }
  })
  })
}
let resultUserName=await queryUserName(sqlUserName);
  // let TokenX=`SELECT Token FROM Token WHERE UserName="${UserName}"`;
  // const queryToken=function checkToken(sql){
  //   return new Promise((resolve,reject)=>{
  //    connection.query(sql,function(err,result){
  //      if (err){
  //        console.log("查询出错");
  //      }else{
  //        resolve(result);
  //      }
  //   })
  //   })
  // }
  // let resultToken=await queryToken(TokenX);

if (resultUserName.length==0||resultUserName[0].Password!=Password){
 ctx.body={
   state:"failed"
 }
}else{
  let token=await createToken(ctx.request.body.UserName);
  console.log("签发的token是"+token);
  let sql=`insert INTO token (USERNAME,TOKEN) VALUES ("${UserName}","${token}")`;
  let queryRegist=function checkRegist(sql){
      return new Promise((resolve,reject)=>{
       connection.query(sql,function (err, result) {
         if(err){
          console.log('[INSERT ERROR] - ',err.message);
          return;
         }else{
           resolve(result);
         }   
     });
   })
 }
 let resultRegist=await  queryRegist(sql);
 console.log(resultRegist);
 if (resultRegist.affectedRows!=0){
  ctx.body={
    state:"success",
    token:token,
    username:UserName,
  }
}

}
})
//获得用户自己的信息
router.get("/GetUserInfo",async(ctx)=>{
  let UserName=ctx.request.query.UserName;
  let result={};
  await UserInfo.GetUserInfo(UserName).then(item=>{
     result=item; 
  });
  ctx.body=result;
})
//获得好友列表
router.get("/GetUserFriend",async(ctx,next)=>{
   let UserName=ctx.request.query.UserName;
   let result=[];
   await UserInfo.GetUserFriend(UserName).then(item=>{
     result=item;
   });
   ctx.body={
     FriendList:result,
   } 
})
router.get("/GetIfFriend",async(ctx,next)=>{
  let UserName=ctx.request.query.UserName;
  let OtherUserName=ctx.request.query.OtherUserName;
  await UserInfo.GetIfFriend(UserName,OtherUserName).then(item=>{
    result=item;
  })
  ctx.body={
    Flag:result
  }
})
//添加好友相关
router.post("/AddFriend",async(ctx)=>{
  let UserName=ctx.request.body.UserName;
  let OtherUserName=ctx.request.body.OtherUserName;
  console.log("名字"+UserName);
  let msg;
  await Friend.AddFriend(UserName,OtherUserName).then(result=>{
    msg=result;
  })
  ctx.body=msg;
})
//获取还没有同意的好友请求
router.get("/GetFriendRequestList",async(ctx,next)=>{
  let FriendRequestList=[];
  let FinalFriendRequestList=[];
  await Friend.GetFriendRequestList(ctx.request.query.UserName).then(result=>{
       FriendRequestList=result;
  });
  for (let i of FriendRequestList){
    await UserInfo.GetUserInfo(i.UserName).then(result=>{
      FinalFriendRequestList.push(result);
    })
  }
  ctx.body={
    FriendRequestList:FinalFriendRequestList
  }
})
//添加好友相应成功  
router.post("/AddFriendSuccess",async(ctx,next)=>{
   let msg;
   await Friend.AddFriendSuccess(ctx.request.body.UserName,ctx.request.body.OtherUserName).then(result=>{
     msg=result;
   })
   ctx.body={
     msg,
   }
})
router.post("/PostTalk",async(ctx,next)=>{
  Talk.PostTalk(ctx.request.body.UserName,ctx.request.body.OtherUserName,ctx.request.body.Message,ctx.request.body.Date,ctx.request.body.Flag);
  ctx.body={
    state:"success"
  }
}) 
//用户退出
router.post("/LogOut",async(ctx,next)=>{
  let re;
  await UserInfo.LogOut(ctx.request.body.UserName).then(result=>{
    re=result;
  });
  ctx.body={
    state:re, 
  } 
})
//改名
router.post("/ChangeNickUserName",async(ctx,next)=>{
   let re;
   await UserInfo.ChangeNickUserName(ctx.request.body.UserName,ctx.request.body.NickUserName).then(result=>{
     re=result
   });
   ctx.body={
     state:re,
   }
})
router.get("/GetMessageList",async(ctx)=>{
    let FinalResult=[];
    let Final=[];
    await Talk.GetMessageList(ctx.request.query.UserName).then(result=>{
         FinalResult=result;
    })
    for (let i of FinalResult){
      await UserInfo.GetUserInfo(i.UserName).then(result=>{
        result.Flag=0;
        Final.push(result);
      })
    }
    ctx.body={
      MessageList:Final,
    }
})
router.get("/GetTalkMessage",async(ctx,next)=>{
    let FinalResult=[];
    await Talk.GetTalkMessage(ctx.request.query.UserName,ctx.request.query.OtherUserName).then(result=>{
      FinalResult=result;
    })
    ctx.body={
      TalkMessage:FinalResult
    }
})
router.get("/SearchFriend",async(ctx,next)=>{
  let UserName=ctx.request.query.UserName;
  let OtherUserName=ctx.request.query.OtherUserName;
  let result=[];
  await UserInfo.SearchFriend(UserName,OtherUserName).then(item=>{
    result=item;
  });
  ctx.body={
    FriendList:result,
  } 
})
//删除好友
router.post("/DeleteFriend",async(ctx,next)=>{
  let re;
  await Friend.DeleteFriend(ctx.request.body.UserName,ctx.request.body.OtherUserName).then(result=>{
    re=result
  });
  ctx.body={
    state:re,
  } 
})
//更新读消息的状态
router.post("/ClearMessage",async(ctx,next)=>{
  let re;
  await Talk.ClearMessage(ctx.request.body.UserName,ctx.request.body.OtherUserName).then(result=>{
    re=result
  });
  ctx.body={
    state:re,
  } 
})
module.exports = app
