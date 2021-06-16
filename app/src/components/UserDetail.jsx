import "../css/userDetail.css";
import React from "react";
import logo from "../images/logo.svg";
class UserDetail extends React.Component {
    constructor() {
        super();
        this.userProfile = logo;
        this.userName = "Markus Vleno";
    }
    render() {
        return (
            <div className="user-detail">
                <img src={this.userProfile} alt=" " />
                <span>{this.userName}</span>
            </div>
        );
    }
}

export default UserDetail;
