const mongoose = require('mongoose');

const Marking = new mongoose.Schema({
    MarkingName: { type: String, required: true, trim: true },
    link: { type: String, required: true, trim: true },
    driveLink: { type: String, required: true, trim: true },
    author: { type: mongoose.Schema.Types.ObjectId, required: true, trim: true},
    Submitted_Date:{type:String, required:true, trim:true},
    isApproved: { type: Boolean, required: true, default: false },
})

const marking = mongoose.model('Marking', Marking);

module.exports = marking;