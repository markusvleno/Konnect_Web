import "../css/option.css";
import React from "react";
import { connect } from "react-redux";

import UserDetail from "./UserDetail";
import { conversation, addFriend, settings, logout } from "../images/svgs";

class Option extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newConvUI: false,
        };
    }

    // addNewConversation = () => {};

    render() {
        return (
            <div className="option">
                <UserDetail />
                <div className="controls">
                    <div className="control-svg tab-conversation">{conversation()}</div>
                    <div
                        className="control-svg tab-add"
                        onClick={(e) => {
                            this.setState({ newConvUI: !this.state.newConvUI });
                        }}
                    >
                        {addFriend()}
                    </div>
                    <div className="control-svg tab-settings">{settings()}</div>
                    <div className="control-svg tab-logout">{logout()}</div>
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

export default connect(mapStateToProps, {})(Option);
