const {ObjectId} =  require("mongodb")
const {Database} = require('../database/index');

const COLLECTION = 'users';

const getAll = async ()=>{
    const colletion  = await Database(COLLECTION);
    return await colletion.find({}).toArray();
}

const getById = async(id)=>{
    const colletion = await Database(COLLECTION);
    return colletion.findOne({_id:ObjectId(id)});
}

const create = async (user)=>{
    const colletion =  await Database(COLLECTION);
    let result = await colletion.insertOne(user);
    return result.insertedId ;   
}

const update = async (id, user)=>{
    const colletion = await Database(COLLECTION);
    let update = await colletion.updateOne({_id:ObjectId(id)},{$set:user});
    return update;
}

const deleteId = async (id)=>{
    const collection = await Database(COLLECTION);
    let result = await collection.deleteMany({_id:ObjectId(id)});
    return result;
}

module.exports.UsersService = {
    getAll,
    getById,
    create,
    update,
    deleteId
}