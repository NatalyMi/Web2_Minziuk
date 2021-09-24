var express=require('express');
var app=express();
var cookieParser=require('cookie-parser')();
var session=require('cookie-session')({keys:['secret'],
maxAge:2*60*60*1000});
const passport = require('passport');
var bodyParser=require('body-parser');
var server=require('http').createServer(app);
var io=require('socket.io')(server);
var LocalStrategy=require('passport-local').Strategy;
var ChatUser=require('./chatuser');
var users=[];

app.use(express.static(__dirname));
app.use(cookieParser);
app.use(session);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(passport.initialize({}))
app.use(passport.session({}));

var auth=passport.authenticate(
   'local',{
   successRedirect:'/',
   failureRedirect:'/login'
});
var myAuth=function(req,res,next){
   if(req.isAuthenticated())
   next();
   else {
   res.redirect('/login');
   }
}
passport.use(new LocalStrategy(
   function(username,password,done){
   ChatUser.find({username:username,password:password},
   function(err,data){
  // console.log("data:");
   console.log(data);
   if(data.length)
   return done(null,{id:data[0]._id.toString(),username:data[0].username});
   //console.log("kk")
   return done(null,false);
   })
}));
passport.serializeUser(function(user,done){
      console.log("serialize user:");
      //console.log(user);
      done(null,user);
});
passport.deserializeUser(function(id,done){
      console.log("deserialize user:");
      //console.log(id);
      ChatUser.find({_id:id.id},
      function(err,data){
     // console.log(data);
      if(err){
         console.log("err")
      } else{
      done(null,{username:data[0].username});
      }
      });
});  


app.get('/',myAuth);
app.get('/',function(req,res){
 //console.log("req.user:");
 //console.log("req.user:");
 //console.log(req.user);
// console.log("req.session:");
 //console.log(req.session);
 res.sendFile(__dirname+'/chat.html');
})
app.get('/login',function(req,res){
   res.sendFile(__dirname+'/login.html');
  })    
app.post('/login',auth);
io.use(function(socket, next) {
   var req = socket.handshake;
   var res = {};
   cookieParser(req, res, function(err) {
   if (err) return next(err);
   session(req, res, next);
   });
  })

  io.on('connection', function (socket) {
   var user=socket.handshake.session.passport.user.username;
   var pos=users.indexOf(user);
   console.log("in")
   if(pos==-1) users.push(user);
   socket.on('joinclient',function(data){
      console.log("in2")
   //console.log("push");
   //console.log(data);
  // console.log("socket-clients:");
   //console.log(Object.keys(io.sockets.sockets));
   socket.emit('joinserver',{user});
   socket.broadcast.emit('joinserver',{msg:"В чат увійшов "+user, users:users});
   
   });
   socket.on("chat message", function (data) {
      
      io.emit("chat message",{user:user,data:data});
  });
 
   //console.log(data);
   socket.emit('joinuser', user)
  
  });
server.listen(3001);
console.log('Run server!');