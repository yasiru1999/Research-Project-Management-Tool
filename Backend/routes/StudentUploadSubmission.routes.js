const express = require('express');
const router = express.Router();

const SubmissionTypeService = require('../Controllers/StudentUploadSubmissions');

module.exports = function(){
    router.post('/', SubmissionTypeService.addStudentSubmission);
    router.post('/StudentUploadFile', SubmissionTypeService.StudentUploadFile);
    router.get('/', SubmissionTypeService.getStudentSubmission);
    router.put('/approve', SubmissionTypeService.approveStudentSubmission);
    router.put('edit/:id', SubmissionTypeService.editStudentSubmission);

    return router;
}
