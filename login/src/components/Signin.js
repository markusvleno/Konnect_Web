import "../css/style.css";
import React from "react";
import rightArrow from "../images/right-arrow.svg";

class Signin extends React.Component {
    render() {
        return (
            <div className="signin">
                <form className="option form">
                    <span className="welcome">Welcome Back.</span>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
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
                        <button type="button">Sign Up</button>
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
