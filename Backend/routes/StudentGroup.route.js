const express = require('express');
const router = express.Router();

const StudentGroupController = require('../Controllers/StudentGroup');

module.exports = function (){
    router.post('/',StudentGroupController.addStudentGroup);
    router.get('/',StudentGroupController.viewStudentGroups);

    return router;
}