'use strict';
const {ObjectId} = require("mongodb");
const {Database} = require('../database/index');

const COLLECTION = 'sales';

const getAll = async ()=>{
    const collection  = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async(id)=>{
    const collection = await Database(COLLECTION);
    return collection.findOne({_id:ObjectId(id)});
}

const create = async (product, user)=>{
    const collection =  await Database(COLLECTION);
    let sale = {};
    let result = await collection.insertOne(sale);
    return result.insertedId ;   
}

const update = async (id, sale)=>{
    const collection = await Database(COLLECTION);
    let update = await collection.updateOne({_id:ObjectId(id)},{$set:sale});
    return update;
}

const deleteId = async (id)=>{
    const collection = await Database(COLLECTION);
    let result = await collection.deleteMany({_id:ObjectId(id)});
    return result;
}

const generateReporteSales = async(name, res)=>{
    let products = await getAll();
    ProductsUtils.excelGenerator(products, name, res);
}

