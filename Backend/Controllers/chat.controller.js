const Chat = require("../models/chat.model");
const ChatGroup = require("../models/chatGroup.model");

async function sendChat(req, res) {
    try {
        const { message, sender, chatGroup, student, staff } = req.body;
        if (chatGroup) {
            const chat = new Chat({ message, sender, chatGroup });
            await chat.save();
            res.send("success");
        } else {
            if (student && staff) {
                const _chatGroup = ChatGroup({ student, staff });
                await _chatGroup.save();
                const chat = new Chat({
                    message,
                    sender,
                    chatGroup: _chatGroup,
                });
                await chat.save();
                res.send("success");
            } else {
                res.status(404).send("Stududent or chat group not found");
            }
        }
    } catch (error) {
        res.status(500).json({ err: true, msg: error });
    }
}
async function getChatgroupsBySupervisor(req, res) {
    try {
        const groups = await ChatGroup.find({ staff: req.params.id }).populate(
            "student",
            "StudentName"
        );
        return res.json(groups);
    } catch (error) {
        res.status(500).json({ err: true, msg: error });
    }
}

module.exports = { sendChat, getChatgroupsBySupervisor };
