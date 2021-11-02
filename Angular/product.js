var mongoose=require('./mongoose');
var schemaProduct=new mongoose.Schema({
 name:{
 type:String,
 unique:true,
 required:true
 },
 price:{
 type:Number,
 required:true,
 min:0,
 max:999999
 }
 }, {versionKey:false})
var Product=mongoose.model("Product",schemaProduct);
module.exports=Product;