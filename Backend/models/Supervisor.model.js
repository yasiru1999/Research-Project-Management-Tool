const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupervisorSchema = new Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },
    SupervisorId: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    university: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    ResearchField: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    isSupervisor: {
        type: String,
        required: true,
        trim: true
    }

})
const Supervisor = mongoose.model('Supervisor',SupervisorSchema);
module.exports = Supervisor;