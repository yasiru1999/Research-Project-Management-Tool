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
    N4studentSpecial: {type: String, required: true, trim: true},
    panel_member1: {type: String, required: true, trim: true,default:null},
    panel_member2: {type: String, required: true, trim: true,default:null},
    panel_member3: {type: String, required: true, trim: true,default:null},
    panel_member4: {type: String, required: true, trim: true,default:null},
})
const StudentGroup = mongoose.model('StudentGroup',StudentGroupSchema);
module.exports = StudentGroup;