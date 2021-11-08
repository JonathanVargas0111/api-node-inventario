const {ObjectId} =  require("mongodb")
const {Database} = require('../database/index');
const {ProductsUtils} =  require('./utils');

const COLLECTION = 'products';

const getAll = async ()=>{
    const colletion  = await Database(COLLECTION);
    return await colletion.find({}).toArray();
}

const getById = async(id)=>{
    const colletion = await Database(COLLECTION);
    return colletion.findOne({_id:ObjectId(id)});
}

const create = async (product)=>{
    const colletion =  await Database(COLLECTION);
    let result = await colletion.insertOne(product);
    return result.insertedId ;   
}

const update = async (id, product)=>{
    const colletion = await Database(COLLECTION);
    let update = await colletion.updateOne({_id:ObjectId(id)},{$set:product});
    return update;
}

const deleteId = async (id)=>{
    const collection = await Database(COLLECTION);
    let result = await collection.deleteMany({_id:ObjectId(id)});
    return result;
}

const generateReporte = async(name, res)=>{
    let products = await getAll();
    ProductsUtils.excelGenerator(products, name, res);
}

module.exports.ProductsService = {
    getAll,
    getById,
    create,
    update,
    deleteId,    
    generateReporte
}