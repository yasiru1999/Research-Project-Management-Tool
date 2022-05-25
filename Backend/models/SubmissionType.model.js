const mongoose = require('mongoose');

const SubmissionType = new mongoose.Schema({
    topic: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    link: { type: String, required: true, trim: true },
    author: { type: mongoose.Schema.Types.ObjectId, required: true, trim: true},
    Exp_Date:{type:Date, required:true, trim:true},
    isApproved: { type: Boolean, required: true, default: false },
})

const Submission = mongoose.model('SubmissionType', SubmissionType);

module.exports = Submission;