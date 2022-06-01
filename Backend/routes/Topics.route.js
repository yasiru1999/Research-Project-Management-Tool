const express = require('express');
const router = express.Router();

const TopicsController = require('../Controllers/Topics');

module.exports = function (){

    router.post('/',TopicsController.addTopics);
    router.post('/uploadFile',TopicsController.uploadFile);
    router.get('/getTopic',TopicsController.viewTopic);
    router.put('/updateTopic/:id',TopicsController.updateTopic);
    return router;
}