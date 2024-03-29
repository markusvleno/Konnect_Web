import "../css/users.css";
import React, { createRef } from "react";
import { connect } from "react-redux";

import { openConvWindow } from "../redux/slice/UI";
import { timeCalcl } from "../utils";
class Users extends React.PureComponent {
    constructor(props) {
        super(props);
        this.convList = createRef();
    }

    getLastMsg = (chatLog) => {
        const lmsg = chatLog[chatLog.length - 1];

        return lmsg.data.length > 20 ? lmsg.data.substring(0.2) + "..." : lmsg.data;
    };

    makeConversationList = () => {
        // const convList = this.props.user.conversation
        //     ? this.props.user.conversation.sort((conv1, conv2) => {
        //           return conv1.username - conv2.username;
        //       })
        //     : null;

        // console.log(convList);

        let list = this.props.user.conversation.map((conv) => {
            return (
                <li
                    key={conv.userId}
                    onClick={(e) => {
                        e.preventDefault();
                        this.props.openConvWindow({ isSelected: true, userId: conv.userId });
                    }}
                >
                    <img
                        src="/static/assets/images/profile.svg"
                        height="40px"
                        width="40px"
                        alt="profile"
                        className="profile"
                    />
                    <div className="name">{conv.username}</div>
                    <div className="lastMsg">{conv.chatLog.length > 0 ? this.getLastMsg(conv.chatLog) : ""}</div>
                    <div className="lastMsgTime">{conv.chatLog.length > 0 ? timeCalcl(conv.chatLog[0].time) : ""}</div>
                </li>
            );
        });
        return list;
    };

    render() {
        return (
            <>
                <div className="users">
                    <ul className="users-list">{this.makeConversationList()}</ul>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
});

export default connect(mapStateToProps, { openConvWindow })(Users);
