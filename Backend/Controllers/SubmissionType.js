const Submission = require('../models/SubmissionType.model');
const multer = require('multer');
const path = require("path");
const {response} = require("express");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'submissionTypeUpload/')
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

const addSubmissionType = async (request, response) => {
    const submission = new Submission(request.body);

    await submission.save().
    then((data) => {
        response.status(200).send({
            Paper: data,
            success: true
        }).
        catch((err) => {
            response.status(500).send({error: err.message});
        });
    }).catch((err) => {
        response.status(500).send({error: err});
    })
}

const getSubmissionType = async (request, response) => {
    try {
        const submission = await returnAllSubmissionTypeWithAuthors();
        response.status(200).json({ submissiontypes: submission });
    } catch (error) {
        response.status(404).json({ error: error.message });
    }
};

const returnAllSubmissionTypeWithAuthors = () => {
    return Submission.find().populate('author');
}

const returnSubmissionType = () => {
    return Submission.find();
}

const uploadFile = async(request, response) => {
    upload(request, response, err => {
        if (err) {
            return response.json({success: false, err})
        }
        return response.json({success: true, fileName: response.req.file.filename})
    })
}

const editSubmissionType = async(request, response) => {
    Submission.findByIdAndUpdate(request.params.id, {
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

const approveSubmissionType = async(request, response) => {
    if(request.body.approve){
        console.log("id",request.body.id)
        Submission.findByIdAndUpdate(request.body.id, {
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
        Submission.findByIdAndDelete(request.body.id, function (err) {
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
    addSubmissionType,
    getSubmissionType,
    uploadFile,
    editSubmissionType,
    approveSubmissionType,
    returnSubmissionType
};
