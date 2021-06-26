import "../css/style.css";
import rightArrow from "../images/right_arrow.svg";

import React from "react";
import { fetchUsername, matchUsername } from "../apis/api";

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.inusername = React.createRef();
        this.inpassword = React.createRef();
    }

    fetchTO = null;

    validateUsername = (username) => {
        if (!matchUsername(username)) return;
        clearTimeout(this.fetchTO);
        this.fetchTO = setTimeout(async () => {
            await fetchUsername(username);
        }, 2000);
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
                        ref={this.inpassword}
                        autoComplete="on"
                        onChange={(event) => {
                            event.preventDefault();
                            this.validateUsername(event.currentTarget.value);
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        ref={this.inpassword}
                        autoComplete="current-password"
                    />
                    <button type="submit">
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
