const { Router } = require("express");
const {
    sendChat,
    getChatgroupsBySupervisor,
} = require("../Controllers/chat.controller");

const chatRouter = Router();
chatRouter.post("/send", sendChat);
chatRouter.get("/getChats/:id", getChatgroupsBySupervisor);

module.exports = chatRouter;
