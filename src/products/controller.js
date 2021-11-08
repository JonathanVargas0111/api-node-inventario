const {ProductsService} = require('./services')
const debug = require('debug')('app:module-products-controller');
const {Response} = require('../common/response')
const createError = require('http-errors');


module.exports.ProductsConstroller = {
    getProducts: async (req,res)=>{
        try {
            let products = await ProductsService.getAll();
            Response.success(res, 200, 'List of products', products);
        } catch (error) {
            debug(error);
            Response.error(res);           
        }
    },
    
    getProduct: async (req,res)=>{
        try {            
            const {params : {id}} = req;
            let product =  await ProductsService.getById(id);      
            if(!product){                
                Response.error(res, new createError.NotFound());
            }else {
                Response.success(res, 200,`Product ${id}`, product);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    createProduct: async(req,res)=>{
        try {
            const {body} = req;
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest());
            }else{
                let insertedId = await ProductsService.create(body);
                console.log(insertedId)
                Response.success(res, 201, `Product add succes`, insertedId)
            }
        } catch (error) {
            debug(error);
            Response.error(res); 
        }
    },

    updateProduct: async(req,res)=>{
        try {
            const {params : {id}} = req;
            const {body} = req;
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest());
            }else{
                let updateResult = await ProductsService.update(id,body);
                Response.success(res, 201, `Product update succes`, updateResult)
            }
        } catch (error) {
            debug(error);
            Response.error(res); 
        }
    },

    deleteProduct: async (req,res)=>{
        try {            
            const {params : {id}} = req;
            let product =  await ProductsService.deleteId(id);      
            if(!product){                
                Response.error(res, new createError.NotFound());
            }else {
                Response.success(res, 200,`Product deleted `, product);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    generaReport: async(req, res) =>{
        try {
            ProductsService.generateReporte('Invnetario', res)
        } catch (error) {
            debug(error);
            Response.error(res); 
        }
    }
}