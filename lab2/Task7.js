module.exports = {
classStorage :class Storage
{
    constructor(name, Shop, capacity)
    {
        this.id = Storage.id++
        this.name = name
        this.Shop = Shop
        this.capacity = capacity
    }
},

classShop: class Shop
{
    constructor(name, address)
    {
        this.id = Shop.id++
        this.name = name
        this.address = address
    }
},
add:function add(elem, collection)
{
    let id = elem.id

    function equalId(element) {
        return element.id == id
    }

    let index = collection.findIndex(equalId)

    if(index == -1)
    collection.push(elem)
    return collection
},

classWare: class Ware
{
    constructor(name, country)
    {
        this.id = Ware.id++
        this.name = name
        this.shop = null
        this.country = country
    }
},

classDeliveredGoods: class DeliveredGoods
{
    constructor(wareId,storageId)
    {
        this.id = DeliveredGoods.id++
        this.wareId = wareId
        this.storageId = storageId
    }  
},

editShop: function editShop(id, newName,newAddress, collection)
{
    function equalId(element){
        return element.id == id
    }
    let index = collection.findIndex(equalId)

    if(index != -1){
        collection[index].name = newName
        collection[index].address = newAddress
    }

    return collection
},
editWare: function editWare(id, newName,  newCountry, collection)
{
    function equalId(element){
        return element.id == id
    }
    let index = collection.findIndex(equalId)

    if(index != -1){
        collection[index].name = newName
        
        collection[index].country = newCountry
    }

    return collection
},

del: function del(id, collection)
{
    function equalId(element){
        return element.id == id
    }

    let index = collection.findIndex(equalId)

    if(index != -1)
        collection.splice(index, 1)
    return collection
},
editStorage: function editStorage(id, newName, newShop, newCapacity, collection)
{
    function equalId(element){
        return element.id == id
    }
    let index = collection.findIndex(equalId)

    if(index != -1){
        collection[index].name = newName
        collection[index].Shop = newShop
        collection[index].capacity = newCapacity
    }

    return collection
},

del: function del(id, collection)
{
    function equalId(element){
        return element.id == id
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
findById: function findById(id, collection) 
{
    function equalName(element) {
        return element.id == id
    }

    let index = collection.findIndex(equalName)

    if(index != -1)
        return collection[index]
    return null
},

deliverWareTostorage: function deliverWareTostorage(Ware, storage, clas,deliverdCollection) {
    let elem = new clas(Ware.id, storage.id)
       deliverdCollection.push(elem)
    return deliverdCollection
},

deliverWareFromstorageTostorage: function deliverWareFromstorageTostorage(id, newstorage,collection)
{
    function equalId(element){
        return element.id == id
    }
    let index = collection.findIndex(equalId)

    if(index != -1){
        collection[index].storageId = newstorage
    }

    return collection
},

deliverWareFromstorageToshop: function deliverWareFromstorageToshop(Ware, shop,deliverdCollection)
{ 
    function equalId(element){
        return element.wareId == Ware.id
    }
    let index = deliverdCollection.findIndex(equalId)
    Ware.shop = shop.name
    deliverdCollection.splice(index,1);
    return deliverdCollection
}
}
