import "../css/style.css";
import rightArrow from "../images/right-arrow.svg";

import React from "react";
//import { validUsername } from "../apis/api";

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.inusername = null;
        this.inpassword = null;
    }
    state = { validUsername: false, username: "", pw: "" };

    componentDidMount() {
        this.inusername = document.getElementById("inusername");
        this.inpassword = document.getElementById("inpassword");
    }

    render() {
        return (
            <div className="signin container">
                <form className="option form">
                    <span className="welcome">Welcome Back.</span>
                    <input
                        type="text"
                        id="inusername"
                        className="pad"
                        placeholder="Username"
                        value={this.state.username}
                        onInput={(e) => {
                            e.preventDefault();
                        }}
                    />
                    <input type="password" placeholder="Password" />
                    <button type="submit" onClick={(event) => event.preventDefault()}>
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
                            onClick={(event) => {
                                event.preventDefault();
                                this.props.changeState(false);
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
