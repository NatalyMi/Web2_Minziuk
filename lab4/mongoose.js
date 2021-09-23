var mongoose=require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Admin:Admin123@cluster0.nlh38.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
console.log("mongodb connect...")
module.exports=mongoose;
//mongodb+srv://Admin:<password>@cluster0.nlh38.mongodb.net/myFirstDatabase?retryWrites=true&w=majority