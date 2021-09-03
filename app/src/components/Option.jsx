import "../css/option.css";
import React from "react";
import UserDetail from "./UserDetail";
import { useSelector } from "react-redux";

import { conversation, addFriend, settings, logout } from "../images/svgs";

const Option = (props) => {
    const profilePicture = useSelector((state) => state.user.profilePicture);

    return (
        <div className="option">
            <UserDetail />
            <div className="controls">
                <div className="control-svg tab-conversation">{conversation()}</div>
                <div className="control-svg tab-add">{addFriend()}</div>
                <div className="control-svg tab-settings">{settings()}</div>
                <div className="control-svg tab-logout">{logout()}</div>
            </div>
            <div className="me-photo">
                <img
                    src={profilePicture}
                    height="40px"
                    width="40px"
                    alt="profile"
                    style={{ display: "flex", margin: "auto" }}
                />
            </div>
        </div>
    );
};

export default Option;
