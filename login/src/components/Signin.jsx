import "../css/style.css";
import rightArrow from "../images/right_arrow.svg";

import React from "react";
import { fetchUsername, matchUsername } from "../apis/api";

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.inusername = React.createRef();
        this.inpassword = React.createRef();
        this.usernameError = React.createRef();
        this.passwordError = React.createRef();
        this.username = "";
        this.password = "";
    }

    state = { validUsername: false, validPassword: false };

    componentDidUpdate() {
        if (this.inusername.current.value < 1) return;

        if (this.state.validUsername) {
            this.inusername.current.classList.add("valid");
            this.inusername.current.classList.remove("not-valid");
        } else {
            this.inusername.current.classList.remove("valid");
            this.inusername.current.classList.add("not-valid");
        }
    }

    fetchTO = null; //timeout ref holder
    validateUsername = (username) => {
        if (username.length <= 1) {
            this.setState({ validUsername: false });
            this.usernameError.current.innerText = "";
            this.inusername.current.classList.remove("valid");
            this.inusername.current.classList.remove("not-valid");
            this.inusername.current.classList.add("pad");
            return;
        }

        if (!matchUsername(username)) {
            this.usernameError.current.innerText = "minimum 5 character long";
            this.setState({ validUsername: false });
            return;
        }

        clearTimeout(this.fetchTO);
        this.fetchTO = setTimeout(async () => {
            const response = await fetchUsername(username);
            if (response.data.available) {
                this.setState({ validUsername: true });
                this.usernameError.current.innerText = "";
            } else {
                this.usernameError.current.innerText = "Not registered!";
                this.setState({ validUsername: false });
            }
        }, 700);
    };

    render() {
        return (
            <div className="signin container">
                <form className="option form">
                    <span className="welcome">Welcome Back.</span>
                    <input
                        type="text"
                        className="pad"
                        placeholder="Username"
                        ref={this.inusername}
                        value={this.state.username}
                        autoComplete="on"
                        onChange={(event) => {
                            event.preventDefault();
                            let username = event.currentTarget.value.trim();
                            this.setState({ username: username });
                            this.validateUsername(username);
                        }}
                    />
                    <span className="inUsernameError" ref={this.usernameError}></span>
                    <input
                        type="password"
                        placeholder="Password"
                        ref={this.inpassword}
                        autoComplete="current-password"
                    />
                    <span className="inPasswordError" ref={this.passwordError}></span>
                    <button
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            if (!this.state.validPassword || !this.state.validUsername) return;
                        }}
                    >
                        <span>Log in</span>
                        <div className="arrow arrow-right">
                            <img src={rightArrow} alt="arrow" />
                        </div>
                    </button>
                </form>
                <div className="controls justify-signin">
                    <div className="ctl-signup">
                        Not a user?
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();

                                this.props.registered(false);
                            }}
                        >
                            Sign up
                        </button>
                    </div>
                    <button type="button" className="ctl-forgot">
                        Forgot password?
                    </button>
                </div>
            </div>
        );
    }
}

export default Signin;
