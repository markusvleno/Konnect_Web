import "../css/option.css";
import React from "react";

class Option extends React.Component {
    render() {
        return (
            <div className="option">
                <div className="user-detail"></div>
                <div className="controls">
                    <div className="control-svg tab-conversation"></div>
                    <div className="control-svg tab-add"></div>
                    <div className="control-svg tab-settings"></div>
                    <div className="control-svg tab-logout"></div>
                </div>
                <div className="me-photo"></div>
            </div>
        );
    }
}

export default Option;
