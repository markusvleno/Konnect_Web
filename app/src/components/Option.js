import "../css/option.css";
import React from "react";

import logo_conv from "../images/conversation.svg";
import logo_add from "../images/add_friend.svg";
import logo_sett from "../images/settings.svg";
import logo_out from "../images/logout.svg";

class Option extends React.Component {
    render() {
        return (
            <div className="option">
                <div className="user-detail"></div>
                <div className="controls">
                    <div className="tab-conversation">
                        <img src={logo_conv} alt="logo conversation" />
                    </div>
                    <div className="tab-add">
                        <img src={logo_add} alt="logo add friends" />
                    </div>
                    <div className="tab-settings">
                        <img src={logo_sett} alt="logo settings" />
                    </div>
                    <div className="tab-logout">
                        <img src={logo_out} alt="logo logout" />
                    </div>
                </div>
                <div className="me-photo"></div>
            </div>
        );
    }
}

export default Option;
