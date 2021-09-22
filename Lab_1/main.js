'use strict'
console.log('Hello Node + JS')
const {classStorage,classShop, add, classWare, classDeliveredGoods, edit, del, findByName,deliverWareTostorage, deliverWareFromstorageTostorage, deliverWareFromstorageToshop}  = require("./Task7.js");

let storagesCollection = Array()
let shopsCollection = Array()
let deliverdCollection = Array()
var wareCollection = Array()
classStorage.id = 1
classShop.id = 1
classWare.id = 1
classDeliveredGoods.id = 1
let nana = new classShop("Nana")
let lily = new classShop("Lily")
let mike = new classShop("Mike")


add(nana, shopsCollection)
add(lily, shopsCollection)
add(mike, shopsCollection)
//console.log(shopsCollection)




let storage1 = new classStorage("storage1", lily)
let storage2 = new classStorage("storage2", nana)
let storage3 = new classStorage("storage2", mike)

add(storage1, storagesCollection)
add(storage2, storagesCollection)
add(storage3, storagesCollection)
//console.log(storagesCollection);

edit(1, "NewStorage1", storagesCollection)
//console.log(storagesCollection);

del(1, storagesCollection)
//console.log(storagesCollection);

//console.log(findByName("Lily", shopsCollection))

let ware1 = new classWare("Lip balm orange")
let ware2 = new classWare("Lip balm red")
add(ware1, wareCollection)
add(ware2, wareCollection)

//console.log(wareCollection);
deliverWareTostorage(ware1, storage1, classDeliveredGoods,deliverdCollection)

//console.log(deliverdCollection)
deliverWareFromstorageTostorage(ware1, storage3,deliverdCollection)
//console.log(deliverdCollection)
 deliverWareFromstorageToshop(ware1,lily, deliverdCollection)
console.log(ware1)
console.log(deliverdCollection)
