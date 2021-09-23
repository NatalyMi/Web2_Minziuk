var User=require('../lab4/models/user');
var express=require('express');
var app=express();
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));
app.get('/getusers',function(req,res){
    User.find(function(err,data){
    console.log(data);
    res.send(data);
    })
   })

app.post('/adduser',function(req,res){
    console.log(req.body);
    var user=new User(req.body);
    user.save(function(err,data){
    if(err) console.log(err.message);
    console.log(data);
    res.send('add user!');
    })
})
app.post('/deleteuser',function(req,res){
    console.log(req.body);
    User.remove({_id:req.body.id},function(err,data){
    res.send('remove user');
    })
   })
   app.post('/updateuser',function(req,res){
    console.log(req.body);
    User.updateOne({_id:req.body.id},{$set:{username:req.body.name, userage: req.body.age}},function(err,data){
        res.send('update user');
        })
   
   })

   app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
   })
   app.listen(process.env.PORT||3000);   
   
