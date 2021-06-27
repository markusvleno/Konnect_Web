import "../css/style.css";
import rightArrow from "../images/right_arrow.svg";

import React from "react";
import { fetchUsername, matchUsername } from "../apis/api";

class Signin extends React.Component {
    render() {
        return (
            <div className="signin container">
                <form className="option form">
                    <span className="welcome">Welcome Back.</span>
                    <input type="text" className="pad" placeholder="Username" ref={this.inusername} autoComplete="on" />
                    <span className="inUsernameError" ref={this.usernameError}></span>
                    <input type="password" placeholder="Password" autoComplete="current-password" />
                    <span className="inPasswordError" ref={this.passwordError}></span>
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
                        <button type="button">Sign up</button>
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
