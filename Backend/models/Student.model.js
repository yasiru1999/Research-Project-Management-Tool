const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({

    StudentId: {
        type: String,
        required: true,
        trim: true
    },
    StudentName: {
        type: String,
        required: true,
        trim: true
    },
    Email: {
        type: String,
        required: true,
        trim: true
    },
    Password: {
        type: String,
        required: true,
        trim: true
    },
    isStudent: {
        type: String,
        required: true,
        trim: true
    }
})
const Student = mongoose.model('Student',StudentSchema);
module.exports = Student;