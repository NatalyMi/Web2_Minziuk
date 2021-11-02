var express=require('express');
var app=express();
var Product = require("./product")
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
    next();  
  });
app.use(express.static(__dirname+'/dist/my-app'));
var bodyParser=require('body-parser');
const { __values } = require('tslib');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/getproducts',function(req,res){
    Product.find(function(err,data){
        console.log(data);
        res.send(data);
        })
   })
   app.post('/addproduct',function(req,res){
    console.log(req.body);
    var product=new Product(req.body);
    product.save(function(err,data){
    if(err) console.log(err.message);
    var id=""
    Product.find(function(err,data){
        id=data[data.length-1]._id.toString();
        res.send(id);
        })
   // console.log(data);
        //console.log(Product.find({}).sort({_id:-1}).limit(1));
        //console.log(toString(Product.find().sort(new Document("_id", -1)).first()))
    
    })
})
app.post('/removeproduct',function(req,res){
    console.log(req.body);
    Product.remove({_id:req.body.id},function(err,data){
    res.send('remove product');
    })
   })
app.get('/',function(req,res){
 res.sendFile(__dirname+'/dist/my-app/index.html');
})

app.listen(process.env.PORT||8080);
console.log('server is run!');