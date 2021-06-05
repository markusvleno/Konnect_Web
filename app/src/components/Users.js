import "../css/users.css";
import React from "react";
import logo from "../images/logo.svg";

class Users extends React.Component {
    constructor() {
        super();
        this.sample = [
            { name: "Baby dbnwd", lastMsg: "brah", lastMsgTime: " 8:00PM" },
            { name: "Baby dbnwd", lastMsg: "brah", lastMsgTime: " 8:00PM" },
            { name: "Baby dbnwd", lastMsg: "brah", lastMsgTime: " 8:00PM" },
            { name: "Baby dbnwd", lastMsg: "brah", lastMsgTime: " 8:00PM" },
            { name: "Baby dbnwd", lastMsg: "brah", lastMsgTime: " 8:00PM" },
            { name: "Baby dbnwd", lastMsg: "brah", lastMsgTime: " 8:00PM" },
            { name: "Baby dbnwd", lastMsg: "brah", lastMsgTime: " 8:00PM" },
        ];
    }

    /*
    <img className="profile" src={user.profile} alt="user profile" />
                <div className="name">{user.name}</div>
                <div className="lastMsg">{user.lastMsg}</div>
                <div className="lastMsgTime">{user.lastMsgTime}</div>
  */
    makeList(user, index) {
        return (
            <li className={`li${index}`}>
                <img className="profile" src={user.profile} alt="user profile" />
                <div className="name">{user.name}</div>
                <div className="lastMsg">{user.lastMsg}</div>
                <div className="lastMsgTime">{user.lastMsgTime}</div>
            </li>
        );
    }

    render() {
        return (
            <div className="users">
                <ul className="users-list">{this.sample.map((user, index) => this.makeList(user, index))}</ul>
            </div>
        );
    }
}

export default Users;
