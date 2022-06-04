const { Server } = require("Backend/utils/socket.io");
const Chat = require("../models/chat.model");

function createSocketServer(server) {
    const io = new Server(server, {
        cors: { origin: "*" },
        path: "/socket/chat",
    });

    io.on("connection", async (socket) => {
        Chat.watch().on("change", async (data) => {
            const _chats = await Chat.find({
                chatGroup: socket.handshake.auth.id,
            });
            if (_chats) {
                console.log(socket.id);
                socket.emit("client-chats", _chats);
            }
        });
        if (socket.handshake.auth.id) {
            const _chats = await Chat.find({
                chatGroup: socket.handshake.auth.id,
            });
            if (_chats) {
                socket.emit("client-chats", _chats);
            }
        }
    });
}

module.exports = createSocketServer;
