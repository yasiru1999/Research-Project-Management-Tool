const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user');

module.exports = function() {
    router.post('/login',userController.login);
    router.post('/',userController.CreateUser);
    router.post('/getAdmins',userController.createAdmins);
    router.get('/getStudents',userController.getStudents);
    router.get('/getStudent/:id',userController.getStudent);
    router.put('/updateStudent/:id',userController.updateStudent);
    router.get('/getSupervisors',userController.getSupervisors);
    router.put('/getSupervisors/:id',userController.getSupervisor);
    ;


    return router;
}