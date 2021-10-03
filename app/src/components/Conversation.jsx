import "../css/conversation.css";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { send } from "../images/svgs";
import { timeCalcl } from "../utils";

import { newMessage } from "../redux/slice/user";

function Conversation() {
    let { signalProtocalManager, socket, username, userId } = useSelector((state) => state.user);
    let { selectedUserId } = useSelector((state) => state.UI.convWindow);

    let convUserObj = useSelector((state) => {
        let temp = [];
        state.user.conversation.forEach((conv) => {
            if (conv.userId === state.UI.convWindow.selectedUserId) {
                temp = conv;
                return;
            }
        });
        return temp;
    });

    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    const scrollBar = useRef(null);
    useEffect(() => {
        scrollBar.current.scrollTop = 9999999;
    });

    useEffect(() => {
        setMessage("");
    }, [selectedUserId]);

    const renderMessageList = () => {
        let chatLog = convUserObj.chatLog;

        if (!chatLog || chatLog.length <= 0) return <></>;

        let List = chatLog.map((msg) => {
            return (
                <li className="messageWrap" key={msg.msgId}>
                    <div className={msg.origin ? "messageBox self" : "messageBox nself"}>
                        <span className="messageData">{msg.data}</span>
                        <span className={msg.origin ? "messageTime rightTime" : "messageTime leftTime"}>
                            {timeCalcl(msg.time)}
                        </span>
                    </div>
                </li>
            );
        });
        return List;
    };

    const sendMessage = async () => {
        try {
            const encryptedMessage = await signalProtocalManager.encryptMessageAsync(convUserObj.userId, message);

            let _msgToSend = {
                data: encryptedMessage,
                type: "msg/text",
                time: Date.now(),
                receiver: {
                    username: convUserObj.username,
                    userId: convUserObj.userId,
                },
                sender: {
                    username: username,
                    userId: userId,
                },
            };

            socket.emit("send-message", { _msgToSend }, (response) => {
                if (!response) {
                    return; //message didnt not send : true or false
                }
                let msgObj = {
                    data: message,
                    type: _msgToSend.type,
                    time: _msgToSend.time,
                    origin: true,
                    msgId: uuid(),
                };

                dispatch(newMessage({ username: _msgToSend.receiver.username, msgObj: msgObj }));
                setMessage("");
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleInput = async (e) => {
        let value = e.target.value.trimStart();
        if (value.length <= 0 || value.length > 256) {
            setMessage("");
            return;
        }
        setMessage(value);
    };

    return (
        <React.Fragment>
            <div className="conversation">
                <div className="messageList">
                    <ul className="msgList" ref={scrollBar}>
                        {renderMessageList()}
                    </ul>
                </div>
                <div className="messageInput">
                    <input
                        type="text"
                        className="messageInputText"
                        name="messageInputText"
                        id="messageInputText"
                        placeholder="Type a message..."
                        value={message}
                        onInput={handleInput}
                        onKeyPress={async (e) => {
                            if (e.code === "Enter") await sendMessage();
                        }}
                    />
                    <div
                        className="sendBtn"
                        onClick={async (e) => {
                            e.preventDefault();
                            await sendMessage();
                        }}
                    >
                        {send()}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Conversation;
