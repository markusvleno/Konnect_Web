import "../css/addFriend.css";
import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import { chatNewConversationWindow, openConvWindow } from "../redux/slice/UI";
import { newConversation } from "../redux/slice/user";

class AddFriend extends React.PureComponent {
    constructor(props) {
        super(props);

        this.usernameRef = React.createRef();
        this.errorMessageRef = React.createRef();
        this.state = {
            username: "",
            validUsername: false,
        };

        this.usernameRegex = /^[a-zA-Z_][a-zA-Z0-9._]{4,30}$/i;

        this.matchUsername = this.matchUsername.bind(this);
        this.renderValidate = this.renderValidate.bind(this);
        this.fetchUser = this.fetchUser.bind(this);
        this.validateUsername = this.validateUsername.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    renderValidate = (control, errorMsg) => {
        if (control === "") {
            this.usernameRef.current.classList.add("pad");
            this.usernameRef.current.classList.remove("not-valid");
            this.usernameRef.current.classList.remove("valid");

            this.errorMessageRef.current.classList.remove("valid-msg");
            this.errorMessageRef.current.classList.remove("not-valid-msg");
            this.errorMessageRef.current.innerText = "";
        } else if (control === "valid") {
            this.usernameRef.current.classList.remove("pad");
            this.usernameRef.current.classList.remove("not-valid");
            this.usernameRef.current.classList.add("valid");

            this.errorMessageRef.current.classList.add("valid-msg");
            this.errorMessageRef.current.classList.remove("not-valid-msg");
            this.errorMessageRef.current.innerText = "";
        } else {
            this.usernameRef.current.classList.remove("pad");
            this.usernameRef.current.classList.add("not-valid");
            this.usernameRef.current.classList.remove("valid");

            this.errorMessageRef.current.classList.remove("valid-msg");
            this.errorMessageRef.current.classList.add("not-valid-msg");
            this.errorMessageRef.current.innerText = errorMsg;
        }
    };

    matchUsername = () => {
        return this.usernameRegex.test(this.state.username);
    };

    fetchUser = async () => {
        const response = await axios
            .post("/api/v1/username", { data: { username: this.state.username } })
            .then((res) => res);
        if (response.status !== 200 || response.data.code !== 200) return false;

        return !response.data.available;
    };

    validateUsername = async () => {
        if (this.state.username === "") {
            this.setState({ validUsername: false });
            this.renderValidate("", "");
            return;
        }

        let passRegex = this.matchUsername();
        if (!passRegex) {
            this.renderValidate("not-valid", "username didn't match!");
            this.setState({ validUsername: false });
            return;
        }

        if (this.state.username === this.props.user.username) {
            this.renderValidate("not-valid", "self conversation is not allowed!");
            this.setState({ validUsername: false });
            return;
        }
        let exist = await this.fetchUser();

        if (!exist) {
            this.renderValidate("not-valid", "user does not exit!");
            this.setState({ validUsername: false });
            return;
        }

        this.renderValidate("valid", "");
        this.setState({ validUsername: true });
    };

    usernameTimeOut;
    handleInput = (event) => {
        event.preventDefault();
        this.setState({ username: event.target.value.trim() });
        clearTimeout(this.usernameTimeOut);
        this.usernameTimeOut = setTimeout(() => {
            this.validateUsername();
        }, 600);
    };

    sendBtnTimeOut;
    handleChat = (event) => {
        event.preventDefault();
        clearTimeout(this.sendBtnTimeOut);
        if (!this.state.validUsername) {
            this.renderValidate("not-valid", "enter username");
            return;
        }

        this.sendBtnTimeOut = setTimeout(async () => {
            let response = await axios
                .get(`/api/v1/user/?username=${this.state.username}`)
                .then((res) => res)
                .catch((error) => {
                    console.log(error);
                    return;
                });
            if (response.status !== 200 || response.data.code !== 200) {
                this.renderValidate("not-valid", "server error!");
                this.setState({ validUsername: false });
                return;
            }
            const { userId, name } = response.data.data;
            let conv = {
                username: this.state.username,
                userId: userId,
                name: name,
                chatLog: [],
            };
            this.setState({ username: "", validUsername: false });
            this.props.chatNewConversationWindow({ value: false });
            this.props.newConversation({ conv });
        }, 600);
    };

    render() {
        return (
            <div className="template-add-friend">
                <div className="add-friend">
                    <span className="title">New Conversation</span>
                    <div className="i">
                        <input
                            type="text"
                            name="username"
                            className="f-input pad"
                            value={this.state.username}
                            ref={this.usernameRef}
                            placeholder="username"
                            spellCheck="false"
                            autoCapitalize="off"
                            onInput={this.handleInput}
                        />
                        <span className="errorMessage" ref={this.errorMessageRef}></span>
                        <div className="f-control">
                            <div
                                className="btn-close"
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.setState({ username: "", validUsername: false });
                                    this.props.chatNewConversationWindow({ value: false });
                                }}
                            >
                                close
                            </div>
                            <div className="btn-chat" onClick={this.handleChat}>
                                chat
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        UI: state.UI,
    };
};

export default connect(mapStateToProps, { chatNewConversationWindow, newConversation, openConvWindow })(AddFriend);
