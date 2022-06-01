const Topics = require('../models/Topics.model');
const multer = require('multer');
const path = require("path");
const {response} = require("express");
const StudentGroup = require("../models/StudentGroup.model");
const Student = require("../models/Student.model");

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'TopicDocUpload/')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.pdf' || ext !== '.doc' || ext !== '.docx' || ext !== '.pptx'){
            return cb(response.status(400).end('Only document type formats are allowed'), false);

        }
        cb(null, true)
    }
})

const upload = multer({storage: fileStorage}).single("file")

const uploadFile = async (request, response) => {
    upload(request, response, err => {
        if(err) {
            return response.json({success: false, err})
        }
        return response.json({success: true, fileName: response.req.file.filename})
    })
}

const addTopics = async (request, response) => {
    const topics = new Topics(request.body);

    await topics.save().
        then((data) => {
            response.status(200).send({
                doc:data,
                success:true
            })
    }).catch((err) => {
        console.log(err);
        response.status(500).send({error: err});
    })
}

const viewTopic = async (request,response) => {
    try{
        const topicDetails = await Topics.find();
        response.status(200).json({topicDetails:topicDetails});
    } catch (error) {
        response.status(401).json({message:error.message});
    }
};

const updateTopic = async (req, res) => {

    Topics.findByIdAndUpdate(req.params.id,{
        $set:req.body},(err,topic)=>{
        if(err){
            console.log(err)
            return res.json({ success: false, err });
        }
        return res.status(200).json({
            success:"Update Student Successfully",
            topic:topic
        });
    });
}

module.exports = {
    addTopics,
    uploadFile,
    viewTopic,
    updateTopic
};