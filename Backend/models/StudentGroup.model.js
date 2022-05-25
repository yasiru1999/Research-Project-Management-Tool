const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentGroupSchema = new Schema({

    N1StudentName: {type: String, required: true, trim: true},
    N1StudentID: {type: String, required: true, trim: true},
    N1StudentSpecial: {type: String, required: true, trim: true},
    N2StudentName: {type: String, required: true, trim: true},
    N2StudentID: {type: String, required: true, trim: true},
    N2StudentSpecial: {type: String, required: true, trim: true},
    N3StudentName: {type: String, required: true, trim: true},
    N3StudentID: {type: String, required: true, trim: true},
    N3StudentSpecial: {type: String, required: true, trim: true},
    N4StudentName: {type: String, required: true, trim: true},
    N4StudentID: {type: String, required: true, trim: true},
    N4StudentSpecial: {type: String, required: true, trim: true},

})
const StudentGroup = mongoose.model('StudentGroup',StudentGroupSchema);
module.exports = StudentGroup;