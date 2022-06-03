const express = require('express');
const router = express.Router();

const SubmissionService = require('../Controllers/Submissions');

module.exports = function(){
    router.post('/', SubmissionService.addSubmission);
    router.get('/', SubmissionService.getSubmission);

    return router;
}