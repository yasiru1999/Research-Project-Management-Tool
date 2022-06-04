const mongoose = require("mongoose");

const chatGroupSchema = new mongoose.Schema({
    student: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Student",
    },
    staff: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "StaffMember",
    },
});

chatGroupSchema.index({ student: 1, staff: 1 }, { unique: true });
const chatGroup = mongoose.model("ChatGroup", chatGroupSchema);

module.exports = chatGroup;
