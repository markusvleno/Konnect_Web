import { io } from "socket.io-client";

class MessageHandler {
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

        console.log(this.socket);

        // this.chat = this.socket.io;

        // this.chat.emit("hi");
        // this.chat.on("hello", () => {
        //     console.log("rec hello");
        // });
    }
}

export default MessageHandler;
