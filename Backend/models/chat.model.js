const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    message: { type: String, required: true },
    sender: { type: String, required: true, enum: ["student", "supervisor"] },
    chatGroup: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "ChatGroup",
    },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
