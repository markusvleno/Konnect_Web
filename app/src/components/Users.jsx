import "../css/users.css";
import React from "react";
import { connect } from "react-redux";

import { timeCalcl } from "../utils";
class Users extends React.PureComponent {
    makeConversationList = () => {
        let list = this.props.user.conversation.map((conv) => {
            return (
                <li key={conv.chatID}>
                    <img
                        src="/static/assets/images/profile.svg"
                        height="40px"
                        width="40px"
                        alt="profile"
                        className="profile"
                    />
                    <div className="name">{conv.username}</div>
                    <div className="lastMsg">{conv.chatLog[0].data || ""}</div>
                    <div className="lastMsgTime">{timeCalcl(conv.chatLog[0].time) || ""}</div>
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
});

export default connect(mapStateToProps, null)(Users);
