import "../css/option.css";
import React from "react";
import { connect } from "react-redux";

import UserDetail from "./UserDetail";
import { conversation, addFriend, settings, logout } from "../images/svgs";
import { chatNewConversationWindow, openConvWindow } from "../redux/slice/UI";

class Option extends React.Component {
    render() {
        return (
            <div className="option">
                <UserDetail />
                <div className="controls">
                    <div
                        className="control-svg tab-conversation"
                        onClick={(e) => {
                            e.preventDefault();
                            this.props.openConvWindow({ userId: null, isSelected: false });
                        }}
                    >
                        {conversation()}
                    </div>
                    <div
                        className="control-svg tab-add"
                        onClick={(e) => {
                            e.preventDefault();
                            this.props.chatNewConversationWindow({ value: true });
                        }}
                    >
                        {addFriend()}
                    </div>
                    {/* <div className="control-svg tab-settings">{settings()}</div> */}
                    <div
                        className="control-svg tab-logout"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location = "\logout";
                        }}
                    >
                        {logout()}
                    </div>
                </div>
                <div className="me-photo">
                    <img
                        src="/static/assets/images/profile.svg"
                        height="40px"
                        width="40px"
                        alt="profile"
                        style={{ display: "flex", margin: "auto" }}
                    />
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
});

export default connect(mapStateToProps, { chatNewConversationWindow, openConvWindow })(Option);
