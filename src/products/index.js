const express = require('express')

const {ProductsConstroller} = require('./controller')

const router = express.Router();

module.exports.ProductsAPI = (app)=>{
    router
        .get('/', ProductsConstroller.getProducts)
        .get("/report", ProductsConstroller.generaReport)
        .get('/:id',ProductsConstroller.getProduct)
        .put('/:id',ProductsConstroller.updateProduct)
        .delete('/:id',ProductsConstroller.deleteProduct)
        .post('/',ProductsConstroller.createProduct)
    app.use('/api/products',router);
}

