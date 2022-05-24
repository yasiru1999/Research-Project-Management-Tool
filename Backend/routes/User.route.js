const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user');

module.exports = function() {
    router.post('/login',userController.login);
    router.post('/',userController.CreateUser);

    return router;
}