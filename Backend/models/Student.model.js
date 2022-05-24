const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({

    id: {
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
    password: {
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