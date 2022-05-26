const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user');

module.exports = function() {
    router.post('/login',userController.login);
    router.post('/',userController.CreateUser);
    router.post('/getAdmins',userController.createAdmins);
    router.get('/getStudents',userController.getStudents);
    router.get('/getStudent/:id',userController.getStudent);
    router.put('/updateStudent/:ID',userController.updateStudent);
    router.delete('/deleteStudent/:id',userController.deleteStudent);
    router.get('/getSupervisors',userController.getSupervisors);
    router.get('/getSupervisor/:id',userController.getSupervisor);
    router.put('/updateSupervisor/:ID',userController.updateSupervisor);
    router.delete('/deleteSupervisor/:id',userController.deleteSupervisor);
    ;


    return router;
}