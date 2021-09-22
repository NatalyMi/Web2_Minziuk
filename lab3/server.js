//підключаємо модуль express
var express=require('express');
//створюємо проект
var app=express();
var fs=require('fs');
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
//папка для віддачі статичного контенту (каталог проекту)
app.use(express.static(__dirname));

app.get('/getusers',function(req,res){
 fs.readFile('data.json','utf-8',function(err,data){
 //console.log(data);
 res.send(JSON.parse(data));
 })
})

//опрацювання кореневого шляху -віддати клієнту index.html
app.get('/',function(req,res){
 res.sendFile(__dirname+'/index.html');
})

//порт прослуховування для сервера
//автоматичний підбір для віддаленого сервера,
//або 8080 для localhost
app.listen(process.env.PORT||8080);
//повідомлення про запуск сервера
console.log('Run server!');
