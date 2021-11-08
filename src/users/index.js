const express = require('express')

const {UsersConstroller} = require('./controller');

const router = express.Router();

module.exports.UserAPI = (app)=>{
    router
        .get('/', UsersConstroller.getUsers)
        .get('/:id',UsersConstroller.getUser)
        .put('/:id',UsersConstroller.updateUser)
        .delete('/:id',UsersConstroller.deleteUser)
        .post('/',UsersConstroller.createUser)
    app.use('/api/users',router)

}