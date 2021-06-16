import "../css/conversation.css";
import React from "react";
import UserDetail from "./UserDetail";

class Conversation extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="btn-back"></div>
                <UserDetail />
                <div className="conversation"></div>
            </React.Fragment>
        );
    }
}

export default Conversation;
