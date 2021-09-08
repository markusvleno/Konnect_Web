import { Manager } from "socket.io-client";

const socket = new Manager("http://localhost:5000", {
    path: "/socket",
    autoConnect: true,
    reconnectionDelay: 1000,
    withCredentials: true,
    forceNew: false,
    reconnectionAttempts: 3,
});

class MessageHandler {
    constructor() {
        this.socket = socket.socket("/chat");

        console.log(this.socket);

        // this.chat = this.socket.io;

        // this.chat.emit("hi");
        // this.chat.on("hello", () => {
        //     console.log("rec hello");
        // });
    }
}

export default MessageHandler;
