const mongoose = require('mongoose');

const DownloadTemplate = new mongoose.Schema({
    Template_name: { type: String, required: true, trim: true },
    link: { type: String, required: true, trim: true },
    driveLink: { type: String, required: true, trim: true },
    author: { type: mongoose.Schema.Types.ObjectId, required: true, trim: true},
    Submitted_Date:{type:String, required:true, trim:true},
    isApproved: { type: Boolean, required: true, default: false },
})

const downloadTemplate = mongoose.model('DownloadTemplate', DownloadTemplate);

module.exports = downloadTemplate;