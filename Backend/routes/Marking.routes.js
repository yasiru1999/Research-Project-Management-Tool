const express = require('express');
const router = express.Router();

const MarkingService = require('../Controllers/Marking.controller');

module.exports = function(){
    router.post('/', MarkingService.addMarking);
    router.post('/markingUpload', MarkingService.MarkingUploadFile);
    router.get('/', MarkingService.getMarking);
    router.put('/approve', MarkingService.approveMarking);
    router.put('edit/:id', MarkingService.editMarking);

    return router;
}
