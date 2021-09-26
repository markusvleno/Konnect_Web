import { v4 } from "uuid";
const _24hr = 86400000;

export const timeCalcl = (ms) => {
    if (!ms) return " ";

    if (ms < new Date(0)) return " ";

    const currentTime = new Date(Date.now());
    const inputTime = new Date(ms);

    // let inputInHr = inputTime.getHours() > 12 ? inputTime.getHours() - 12 : inputTime.getHours();
    // let inputInM = inputTime.getMinutes();
    // let inputInS = inputTime.getSeconds();

    let gapTime = inputTime.getTime() - currentTime.getTime();

    if (gapTime < _24hr) return inputTime.toLocaleTimeString().slice(0, -3);
    else return inputTime.toLocaleDateString();
};

export class MessageLoader {
    constructor() {
        this.LS = window.localStorage;
    }

    getMessages(userId) {
        const prevMessages = this.LS.getItem(String(userId));

        return prevMessages ? JSON.parse(prevMessages) : null;
    }

    putMessage(userId, messageObj) {
        if (!userId || !messageObj) return;

        if (!messageObj.data) return;
        if (!messageObj.origin) messageObj.origin = false;
        if (!messageObj.msgID) messageObj.msgID = v4();
        if (!messageObj.time) messageObj.time = Date.now();

        let oldMessages = [];
        oldMessages = this.getMessages(userId);

        if (oldMessages) {
            this.LS.removeItem(String(userId));
            this.LS.setItem(String(userId), JSON.stringify([...oldMessages, messageObj]));
        } else {
            this.LS.setItem(String(userId), JSON.stringify([messageObj]));
        }
    }
}
