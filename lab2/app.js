var express = require("express");
var bodyParser = require("body-parser");
const hbs = require("hbs");
const {classStorage,classShop,classWare, classDeliveredGoods, add, editShop,editWare, del, findByName, findById, editStorage, deliverWareFromstorageTostorage}  = require("./Task7.js");

var app = express();
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
  if(localStorage){
    let shops = localStorage.getItem('Shops');
    shops = JSON.parse(shops);
    if(shops != null)
    classShop.id = ++shops[shops.length-1].id;
    else{
        classShop.id = 1
    }
   
    let wares = localStorage.getItem('Wares');
    wares = JSON.parse(wares);
    if(wares != null)
    classWare.id = ++wares[wares.length-1].id;
    else{
        classWare.id = 1
    }
    
    let storages = localStorage.getItem('Storages');
    storages = JSON.parse(storages);
    if(storages != null)
    classStorage.id = ++storages[storages.length-1].id;
    else{
        classStorage.id =1
    }
    let deliveredGoods = localStorage.getItem('DeliveredGoods');
    deliveredGood = JSON.parse(deliveredGoods);
    if(deliveredGoods)
    classDeliveredGoods.id = ++deliveredGood[deliveredGood.length-1].id;
    else{
        classDeliveredGoods.id =1   
    }
  }
var jsonParser = bodyParser.json();
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
app.use("/shop", function(request, response){    
    response.render("index.hbs");
});
app.use("/ware", function(request, response){    
    response.render("ware.hbs");
});
app.use("/storage", function(request, response){    
    response.render("storage.hbs");
});
app.use("/deliver", function(request, response){    
    response.render("deliver.hbs");
});
app.get("/api/users", function(request, response){
    var content = localStorage.getItem('Shops');
     response.send(content);
});
app.get("/api/wares", function(request, response){
    var content = localStorage.getItem('Wares');
     response.send(content);
});
app.get("/api/storages", function(request, response){
    var content = localStorage.getItem('Storages');
     response.send(content);
});
app.get("/api/delivers", function(request, response){
    var content = localStorage.getItem('DeliveredGoods');
     response.send(content);
});
app.get("/api/users/:id", function(request, response){
    var id = request.params.id;
    let shops = localStorage.getItem("Shops");
    shops = JSON.parse(shops);
    var shop = null;
    for (let i = 0; i < shops.length; i++) {
        if(id == shops[i].id) {
            shop = shops[i];
            break;
        } 
    }

    if(shop) {
        response.send(JSON.stringify(shop));
    } else {
        response.sendStatus(400);
    }

})
app.get("/api/wares/:id", function(request, response){
    var id = request.params.id;
    let shops = localStorage.getItem("Wares");
    shops = JSON.parse(shops);
    var shop = null;
    for (let i = 0; i < shops.length; i++) {
        if(id == shops[i].id) {
            shop = shops[i];
            break;
        } 
    }

    if(shop) {
        response.send(JSON.stringify(shop));
    } else {
        response.sendStatus(400);
    }

})
app.get("/api/storages/:id", function(request, response){
    var id = request.params.id;
    let shops = localStorage.getItem("Storages");
    shops = JSON.parse(shops);
    var shop = findById(id,shops)
    if(shop) {
        response.send(JSON.stringify(shop));
    } else {
        response.sendStatus(400);
    }

})
app.get("/api/deliver/:id", function(request, response){
    var id = request.params.id;
    let shops = localStorage.getItem("DeliveredGoods");
    shops = JSON.parse(shops);
    var shop = findById(id,shops)
    if(shop) {
        response.send(JSON.stringify(shop));
    } else {
        response.sendStatus(400);
    }

})

app.post("/api/users", jsonParser, function(request, response){
    console.log("222");
    if(!request.body){
        response.sendStatus(400);
    } 
    var name = request.body.name;
    var address = request.body.address;
    var type = request.body.type;
    var key="";
    if(type.indexOf("shop") != -1){
    var  item = new classShop(name, address);
    key="Shops";
    var items = localStorage.getItem("Shops");
    }
    if(type.indexOf("ware") != -1){
        var  item = new classWare(name, address);
        key="Wares";
        var items = localStorage.getItem("Wares");
        }
        if(type.indexOf("storage") != -1){
            var  item = new classStorage(name, request.body.shop,request.body.capacity);
            key="Storages";
            var items = localStorage.getItem(key);
            }
            if(type.indexOf("deliver") != -1){
                var  item = new classDeliveredGoods(request.body.wareId, request.body.storageId);
                key="DeliveredGoods";
                var items = localStorage.getItem("DeliveredGoods");
                }
    
    items = JSON.parse(items);
    if(items == null)
    items = Array()
    console.log(key)

    console.log(item)
    add(item, items);
    localStorage.setItem(key,JSON.stringify(items));
    response.send(item);
});
app.post("/api/toShop", jsonParser, function(request, response){
    if(!request.body){
        response.sendStatus(400);
    } 
    var deliverId = request.body.deliverId;      
    var items = localStorage.getItem("DeliveredGoods");
    var wares =  JSON.parse(localStorage.getItem("Wares"));
    items = JSON.parse(items);
  
    var deliver = findById(deliverId, items)
    findById(deliver.wareId, wares).shop = findById(deliver.storageId,JSON.parse(localStorage.getItem("Storages"))).Shop;
    console.log( findById(deliver.wareId, wares))
    console.log(findById(deliver.storageId,JSON.parse(localStorage.getItem("Storages"))).Shop)
    del(deliverId, items)
   
    localStorage.setItem("DeliveredGoods",JSON.stringify(items));
    localStorage.setItem("Wares",JSON.stringify(wares));
    //response.send(item);
});
app.put("/api/users", jsonParser, function(request, response){
    if(!request.body){
        response.sendStatus(400);
    }
    var id = request.body.id;
    var name = request.body.name;
    var address = request.body.address;
    let shops = localStorage.getItem("Shops");
    shops = JSON.parse(shops);
   
    let shop_new = {
        id: id,
        name: name,
        address: address
    };
    
    editShop(id,name,address, shops);
    
   localStorage.setItem("Shops",JSON.stringify(shops));
    response.send(JSON.stringify(shop_new));
});
app.put("/api/wares", jsonParser, function(request, response){
    if(!request.body){
        response.sendStatus(400);
    }
    var id = request.body.id;
    var name = request.body.name;
    var address = request.body.address;
    let items = localStorage.getItem("Wares");
    items = JSON.parse(items);
  let shop = findById(id, items).shop;
    let item_new = {
        id: id,
        name: name,
        country: address,
        shop: shop
    };
    
   items = editWare(id,name,address, items);
    console.log(items)
   localStorage.setItem("Wares",JSON.stringify(items));
    response.send(JSON.stringify(item_new));
});
app.put("/api/storages", jsonParser, function(request, response){
    if(!request.body){
        response.sendStatus(400);
    }
    var id = request.body.id;
    var name = request.body.name;
    var shop = request.body.shop;
    var capacity = request.body.capacity;
    let items = localStorage.getItem("Storages");
    items = JSON.parse(items);
  
    let item_new = {
        id: id,
        name: name,
        shop: shop,
        capacity:capacity
    };
    
   items = editStorage(id,name,shop,capacity, items);
    console.log(items)
   localStorage.setItem("Storages",JSON.stringify(items));
    response.send(JSON.stringify(item_new));
});
app.put("/api/deliver", jsonParser, function(request, response){
    if(!request.body){
        response.sendStatus(400);
    }
    var id = request.body.id;
    var wareId = request.body.wareId;
    var storageId = request.body.storageId;
    let items = localStorage.getItem("DeliveredGoods");
    items = JSON.parse(items);
    let storages = localStorage.getItem("Storages");
    storages = JSON.parse(storages);
    var prevStorage =findById( findById(id,items).id, storages)

    if(parseInt(prevStorage.Shop) == parseInt(findById(storageId, storages).Shop)){
    let item_new = {
        id: id,
        wareId: wareId,
        storageId: storageId,
    };
    
   items = deliverWareFromstorageTostorage(id,storageId, items);
    console.log(items)
   localStorage.setItem("DeliveredGoods",JSON.stringify(items));
    response.send(JSON.stringify(item_new));
    }
    else{
    let item_new = {
        id: id,
        wareId: wareId,
        storageId: "Different shops",
    };
    response.send( item_new)
}
});

app.delete("/api/users/:id", jsonParser, function(request, response){
    if(!request.body){
        response.sendStatus(400);
    }
   
    let shops = localStorage.getItem("Shops");
    shops = JSON.parse(shops);

    var id = request.params.id;
    
    del(id,shops)
   
    localStorage.setItem("Shops",JSON.stringify(shops));
    response.send(JSON.stringify(id));
});
app.delete("/api/wares/:id", jsonParser, function(request, response){
    if(!request.body){
        response.sendStatus(400);
    }
   
    let items = localStorage.getItem("Wares");
    items = JSON.parse(items);

    var id = request.params.id;
    
    del(id,items)
   
    localStorage.setItem("Wares",JSON.stringify(items));
    response.send(JSON.stringify(id));
});
app.delete("/api/storages/:id", jsonParser, function(request, response){
    if(!request.body){
        response.sendStatus(400);
    }
   
    let items = localStorage.getItem("Storages");
    items = JSON.parse(items);

    var id = request.params.id;
    
    del(id,items)
   
    localStorage.setItem("Storages",JSON.stringify(items));
    response.send(JSON.stringify(id));
});
app.delete("/api/deliver/:id", jsonParser, function(request, response){
    if(!request.body){
        response.sendStatus(400);
    }
   
    let items = localStorage.getItem("DeliveredGoods");
    items = JSON.parse(items);
    var id = request.params.id;
    del(id,items)
    localStorage.setItem("DeliveredGoods",JSON.stringify(items));
    response.send(JSON.stringify(id));
});
app.post("/api/search", jsonParser, function(request, response){
    if(!request.body){
        response.sendStatus(400);
    }
    var type = request.body.type;
    let items = localStorage.getItem(type);
    items = JSON.parse(items);
    var name = request.body.name;
  
   let item = findByName(name, items)
  
    
    response.send(item);
});
app.post("/api/onStorage", jsonParser, function(request, response){
    if(!request.body){
        response.sendStatus(400);
    }
    
    let items = localStorage.getItem("DeliveredGoods");
    items = JSON.parse(items);
    let wares = localStorage.getItem("Wares");
    wares = JSON.parse(wares);
    var storageId = request.body.storageId;
  
    let res =[];
  items  = items.filter(function(value, index, arr){ 
        if(parseInt(value.storageId) == parseInt(storageId))
        res.push(findById(value.wareId,wares) )
    return ;
});


console.log(res);
    response.send(JSON.stringify(res));
});
app.post("/api/report", jsonParser, function(request, response){
    if(!request.body){
        response.sendStatus(400);
    }
    
    let items = localStorage.getItem("DeliveredGoods");
    items = JSON.parse(items);
    let st = localStorage.getItem("Storages");
    st = JSON.parse(st);
    st  = st.filter(function(value1, index, arr){ 
        let count = 0;
        items  = items.filter(function(value, index, arr){ 
            if(parseInt(value.storageId) == parseInt(value1.id)){
            count++;
            }
        return value;
        });
        if(parseInt(Math.trunc(parseInt(value1.capacity))/5)>parseInt(count)&&parseInt(Math.trunc(parseInt(value1.capacity))/5)!=parseInt(count))
        return value1;
    return ;
    });


console.log(st);
    response.send(JSON.stringify(st));
});

app.use("/", function(request, response){
      
    response.render("index.hbs");
});
app.listen(3000, function(){
    console.log('Server started\nPort-3000');
})