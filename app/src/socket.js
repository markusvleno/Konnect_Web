import { io } from "socket.io-client";

export class SocketHandler {
    constructor() {
        this.socket = new io("http://localhost:5000/chat", {
            path: "/sockets",
            autoConnect: true,
            reconnectionDelay: 1000,
            withCredentials: true,
            forceNew: false,
            reconnectionAttempts: 3,
            extraHeaders: {
                "Access-Control-Allow-Origin": "http://localhost",
            },
        });
    }
}
