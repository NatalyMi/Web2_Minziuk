module.exports = {
classStorage :class Storage
{
    constructor(name, Shop)
    {
        this.currId = Storage.id++
        this.name = name
        this.Shop = Shop
    }
},

classShop: class Shop
{
    constructor(name)
    {
        this.currId = Shop.id++
        this.name = name
    }
},
add:function add(elem, collection)
{
    let currId = elem.currId

    function equalId(element) {
        return element.currId == currId
    }

    let index = collection.findIndex(equalId)

    if(index == -1)
        collection.push(elem)
    return collection
},

classWare: class Ware
{
    constructor(name)
    {
        this.currId = Ware.id++
        this.name = name
        this.shop = null
    }
},

classDeliveredGoods: class DeliveredGoods
{
    constructor(wareId,storageId)
    {
        this.currId = DeliveredGoods.id++
        this.wareId = wareId
        this.storageId = storageId
    }  
},

edit: function edit(id, newName, collection)
{
    function equalId(element){
        return element.currId == id
    }
    let index = collection.findIndex(equalId)

    if(index != -1)
        collection[index].name = newName

    return collection
},

del: function del(id, collection)
{
    function equalId(element){
        return element.currId == id
    }

    let index = collection.findIndex(equalId)

    if(index != -1)
        collection.splice(index, 1)
    return collection
},

findByName: function findByName(name, collection) 
{
    function equalName(element) {
        return element.name == name
    }

    let index = collection.findIndex(equalName)

    if(index != -1)
        return collection[index]
    return null
},

deliverWareTostorage: function deliverWareTostorage(Ware, storage, clas,deliverdCollection) {
    let elem = new clas(Ware.currId, storage.currId)
       deliverdCollection.push(elem)

},

deliverWareFromstorageTostorage: function deliverWareFromstorageTostorage(elem, newstorage,deliverdCollection)
{
    let currId = elem.currId
    function equalId (element) {
        return element.wareId == currId
    }
    let index = deliverdCollection.findIndex(equalId)
    if(index != -1)
        deliverdCollection[index].storageId = newstorage.currId
},

deliverWareFromstorageToshop: function deliverWareFromstorageToshop(Ware, shop,deliverdCollection)
{ 
    function equalId(element){
        return element.wareId == Ware.currId
    }
    let index = deliverdCollection.findIndex(equalId)
    Ware.shop = shop
    deliverdCollection.splice(index,1);
}
}
