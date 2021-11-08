const express = require('express')
const debug = require('debug')('app:main')

const {Config} = require('./src/config/index')
const {ProductsAPI} = require('./src/products/index')
const { UserAPI } = require('./src/users');
const {IndexAPI, NotFoundAPI} = require('./src/index/index')

const app =  express()

const PORT = Config.port

//Capacidad de recibir datos en cuerpo de la peticion
app.use(express.json())

//Moduls
IndexAPI(app)
ProductsAPI(app);
UserAPI(app);
NotFoundAPI(app);

app.listen(PORT,()=>{
    debug(`Server listen port ${PORT}`)
})