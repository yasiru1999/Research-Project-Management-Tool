const downloadTemplate = require('../models/DownloadTemplates.models');
const multer = require('multer');
const path = require("path");
const {response} = require("express");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'templateUploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.pdf' || ext !== '.doc' || ext !== '.docx' || ext !== '.pptx') {
            return cb(response.status(400).end('only document file formats are allowed'), false);
        }
        cb(null, true)
    }
})

const upload = multer({ storage: storage }).single("file")

const addTemplates = async (request, response) => {
    const submission = new downloadTemplate(request.body);

    await submission.save().
    then((data) => {
        console.log(data.Exp_Date)
        response.status(200).send({
            submissionType: data,
            success: true
        }).
        catch((err) => {
            response.status(500).send({error: err.message});
        });
    }).catch((err) => {
        response.status(500).send({error: err});
    })
}

const getTemplates = async (request, response) => {
    try {
        const submission = await returnAllTemplatesWithAuthors();
        response.status(200).json({ submissiontypes: submission });
    } catch (error) {
        response.status(404).json({ error: error.message });
    }
};

const returnAllTemplatesWithAuthors = () => {
    return downloadTemplate.find().populate('author');
}

const returnTemplates = () => {
    return downloadTemplate.find();
}

const TemplatesUploadFile = async(request, response) => {
    upload(request, response, err => {
        if (err) {
            return response.json({success: false, err})
        }
        return response.json({success: true, fileName: response.req.file.filename})
    })
}

const editTemplates = async(request, response) => {
    downloadTemplate.findByIdAndUpdate(request.params.id, {
        $set: request.body
    }, (error, data) => {
        if (error) {
            console.log(error)
            return response.json({ success: false, error })
        } else {
            response.json(data)
            console.log('Paper updated successfully !')
        }
    })
}

const approveTemplates = async(request, response) => {
    if(request.body.approve){
        console.log("id",request.body.id)
        downloadTemplate.findByIdAndUpdate(request.body.id, {
            isApproved: true
        }, (error) => {
            if (error) {
                console.log(error)
                return response.json({ success: false, error })
            } else {
                response.json({success: true})
                console.log('Workshop updated successfully !')
            }
        })
    }else{
        downloadTemplate.findByIdAndDelete(request.body.id, function (err) {
            if (err){
                return response.json({ success:false,error: err})
            }
            else{
                return response.json({ success:true})
            }
        });
    }
}

module.exports = {
    addTemplates,
    getTemplates,
    TemplatesUploadFile,
    editTemplates,
    approveTemplates,
    returnTemplates
};
