const express = require('express');
const router = express.Router();

const SubmissionTypeService = require('../Controllers/SubmissionType');

module.exports = function(){
    router.post('/', SubmissionTypeService.addSubmissionType);
    router.post('/uploadFile', SubmissionTypeService.uploadFile);
    router.get('/', SubmissionTypeService.getSubmissionType);
    router.put('/approve', SubmissionTypeService.approveSubmissionType);
    router.put('edit/:id', SubmissionTypeService.editSubmissionType);

    return router;
}
