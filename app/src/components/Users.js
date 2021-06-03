import "../css/users.css";
import React from "react";
import logo from "../images/logo.svg";

class Users extends React.Component {
    constructor() {
        super();
        this.sample = [
            { name: "Baby dbnwd", profile: { logo }, lastMsg: "brah", lastMsgTime: " 8:00PM" },
            { name: "Baby dbnwd", profile: { logo }, lastMsg: "brah", lastMsgTime: " 8:00PM" },
            { name: "Baby dbnwd", profile: { logo }, lastMsg: "brah", lastMsgTime: " 8:00PM" },
            { name: "Baby dbnwd", profile: { logo }, lastMsg: "brah", lastMsgTime: " 8:00PM" },
            { name: "Baby dbnwd", profile: { logo }, lastMsg: "brah", lastMsgTime: " 8:00PM" },
            { name: "Baby dbnwd", profile: { logo }, lastMsg: "brah", lastMsgTime: " 8:00PM" },
            { name: "Baby dbnwd", profile: { logo }, lastMsg: "brah", lastMsgTime: " 8:00PM" },
        ];
    }

    /*
    <img className="profile" src={user.profile} alt="user profile" />
                <div className="name">{user.name}</div>
                <div className="lastMsg">{user.lastMsg}</div>
                <div className="lastMsgTime">{user.lastMsgTime}</div>
  */
    makeList(user) {
        return <li>{user.name}</li>;
    }

    k(user) {
        console.log(user);
    }

    render() {
        return (
            <div className="users">
                <ul className="users-list">{this.sample.forEach((user) => this.makeList(user))}</ul>
            </div>
        );
    }
}

export default Users;
