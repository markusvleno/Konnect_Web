import "../css/conversation.css";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { send } from "../images/svgs";
import { timeCalcl } from "../utils";

function Conversation() {
    let convUserObj = useSelector((state) => {
        let temp = {};
        state.user.conversation.forEach((user) => {
            if (user.userId === state.UI.convWindow.selectedUserId) temp = user;
        });
        return temp;
    });

    const [message, handleMessage] = useState("");

    const scrollBar = useRef(null);
    useEffect(() => {
        scrollBar.current.scrollTop = 9999999;
    });

    const renderMessageList = () => {
        let chatLog = convUserObj.chatLog;

        if (!chatLog || chatLog.length <= 0) return <></>;

        let List = chatLog.map((msg) => {
            return (
                <li className="messageWrap" key={msg.msgID}>
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

    const handleSendMessage = () => {
        let _msg = message.trim();

        if (_msg.length <= 0 || _msg === "") return;

        let _msgObj = {
            date: _msg,
            time: Date.now(),
            type: "msg/text",
            convUserObj: convUserObj,
        };
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
                        onInput={(e) => {
                            handleMessage(e.currentTarget.value);
                        }}
                        onKeyPress={(e) => {
                            // console.log(e.key);
                        }}
                    />
                    <div className="sendBtn">{send()}</div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Conversation;
