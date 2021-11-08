const {UsersService} = require('./services')
const debug = require('debug')('app:module-users-controller');
const {Response} = require('../common/response')
const createError = require('http-errors');


module.exports.UsersConstroller = {
    getUsers: async (req,res)=>{
        try {
            let users = await UsersService.getAll();
            Response.success(res, 200, 'List of users', users);
        } catch (error) {
            debug(error);
            Response.error(res);           
        }
    },    
    getUser: async (req,res)=>{
        try {            
            const {params : {id}} = req;
            let user =  await UsersService.getById(id);      
            if(!product){                
                Response.error(res, new createError.NotFound());
            }else {
                Response.success(res, 200,`User ${id}`, user);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    createUser: async(req,res)=>{
        try {
            const {body} = req;
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest());
            }else{
                let insertedId = await UsersService.create(body);
                Response.success(res, 201, `User add succes`, insertedId)
            }
        } catch (error) {
            debug(error);
            Response.error(res); 
        }
    },
    updateUser: async(req,res)=>{
        try {
            const {params : {id}} = req;
            const {body} = req;
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest());
            }else{
                let updateResult = await UsersService.update(id,body);
                Response.success(res, 201, `User update succes`, updateResult)
            }
        } catch (error) {
            debug(error);
            Response.error(res); 
        }
    },
    deleteUser: async (req,res)=>{
        try {            
            const {params : {id}} = req;
            let product =  await UsersService.deleteId(id);      
            if(!product){                
                Response.error(res, new createError.NotFound());
            }else {
                Response.success(res, 200,`User deleted `, product);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
}