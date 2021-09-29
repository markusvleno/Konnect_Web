import { putConversation } from "./utils";
import { SocketHandler } from "./socket";

export class MessageHandler {
    constructor() {
        this.ws = new SocketHandler();
    }
}
