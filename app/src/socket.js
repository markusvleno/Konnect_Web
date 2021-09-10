import { io } from "socket.io-client";
import { v4 as uuid } from "uuid";

export class MessageHandler {
    constructor() {
        this.socket = new io("http://localhost:5000/chat", {
            path: "/sockets",
            autoConnect: true,
            reconnectionDelay: 1000,
            withCredentials: true,
            forceNew: false,
            reconnectionAttempts: 3,
            extraHeaders: {
                "Access-Control-Allow-Origin": "*",
            },
        });

        this.messages = [];

        this.socket.on("receive-message", (res) => {
            let data = {
                message: {
                    ID: res.message.ID,
                    data: res.message.data,
                    type: res.message.type,
                    time: res.message.time,
                    origin: false,
                },
                sender: {
                    username: res.sender.username,
                },
            };

            this.messages.push(data);
            console.log(this.messages);
        });
    }

    sendMessage(message, to, from) {
        let data = {
            message: {
                ID: uuid(),
                data: message.data,
                type: message.type,
                time: message.time || Date.now(),
            },
            sender: {
                username: from,
            },
            receiver: {
                username: to,
            },
        };

        this.socket.emit("send-message", data);
    }
}
