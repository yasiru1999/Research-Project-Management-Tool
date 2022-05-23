const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PanelMemberSchema = new Schema({

    PanelMemberId: {
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
    password: {
        type: String,
        required: true,
        trim: true
    },
    isPanelMember: {
        type: String,
        required: true,
        trim: true
    }

})
const PanelMember = mongoose.model('PanelMember',PanelMemberSchema);
module.exports = PanelMember;