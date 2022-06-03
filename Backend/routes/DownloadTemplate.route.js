const express = require('express');
const router = express.Router();

const DownloadTemplateService = require('../Controllers/DownloadTemplate');

module.exports = function(){
    router.post('/', DownloadTemplateService.addTemplates);
    router.post('/TemplateUploadFile', DownloadTemplateService.TemplatesUploadFile);
    router.get('/', DownloadTemplateService.getTemplates);
    router.put('/approve', DownloadTemplateService.approveTemplates);
    router.put('edit/:id', DownloadTemplateService.returnTemplates);

    return router;
}
