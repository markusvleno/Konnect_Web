import "../css/style.css";
import React from "react";
import arrow from "../images/right_arrow.svg";
import { fetchUsername, matchEmail, matchUsername } from "../apis/api";

import { addNotValidBorder, addPadBorder, addValidBorder, changeErrorTextColor } from "./errorRender";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.upEmail = React.createRef();
        this.upEmailError = React.createRef();
        this.upPassword = React.createRef();
        this.upPasswordError = React.createRef();
        this.upRePassword = React.createRef();
        this.upRePasswordError = React.createRef();
        this.upUsername = React.createRef();
        this.upUsernameError = React.createRef();
    }

    state = {
        notSelectUsername: true,
        email: "",
        validEmail: false,
        password: "",
        validPassport: false,
        rePassword: "",
        validRePassword: false,
        username: "",
        validUsername: false,
    };

    renderValidEmail() {
        const email = this.state.email;
        if (email.length < 1) {
            addPadBorder(this.upEmail.current);
            changeErrorTextColor(this.upEmailError.current, false);
            this.upEmailError.current.innerText = "";
            this.setState({ validEmail: false });
        } else if (!matchEmail(email)) {
            addNotValidBorder(this.upEmail.current);
            changeErrorTextColor(this.upEmailError.current, false);
            this.upEmailError.current.innerText = "Not a valid Email";
            this.setState({ validEmail: false });
        } else {
            addValidBorder(this.upEmail.current);
            changeErrorTextColor(this.upEmailError.current, true);
            this.upEmailError.current.innerText = "";
            this.setState({ validEmail: true });
        }
    }

    renderValidPassword() {
        const password = this.state.password;
        if (password.length < 1) {
            addPadBorder(this.upPassword.current);
            changeErrorTextColor(this.upPasswordError.current, false);
            this.upPasswordError.current.innerText = "";
            this.setState({ validPassport: false });
        } else if (password.length < 6) {
            addNotValidBorder(this.upPassword.current);
            changeErrorTextColor(this.upPasswordError.current, false);
            this.upPasswordError.current.innerText = "Minumum 6 character long";
            this.setState({ validPassport: false });
        } else {
            addValidBorder(this.upPassword.current);
            changeErrorTextColor(this.upPasswordError.current, true);
            this.upPasswordError.current.innerText = "";
            this.setState({ validPassport: true });
        }
    }

    renderValidRePassword() {
        const password = this.state.password;
        const rePassword = this.state.rePassword;
        if (rePassword.length < 1) {
            addPadBorder(this.upRePassword.current);
            changeErrorTextColor(this.upRePasswordError.current, false);
            this.upRePasswordError.current.innerText = "";
            this.setState({ validRePassport: false });
        } else if (password !== rePassword) {
            addNotValidBorder(this.upRePassword.current);
            changeErrorTextColor(this.upRePasswordError.current, false);
            this.upRePasswordError.current.innerText = "Password did not match!";
            this.setState({ validPassport: false });
        } else {
            addValidBorder(this.upRePassword.current);
            changeErrorTextColor(this.upRePasswordError.current, true);
            this.upRePasswordError.current.innerText = "";
            this.setState({ validPassport: true });
        }
    }

    renderValidUsername() {
        const username = this.state.username;
        if (!this.state.validEmail || !this.state.validPassport || !this.state.validRePassword) {
            this.setState({ notSelectUsername: true, validUsername: false, username: "" });
            return;
        }
    }

    emailTimeOut;
    validateEmail = (event) => {
        event.preventDefault();
        this.setState({ email: event.target.value.trim() });
        clearTimeout(this.emailTimeOut);
        this.emailTimeOut = setTimeout(() => {
            this.renderValidEmail();
        }, 500);
    };

    passwordTimeOut;
    validatePassport = (event) => {
        event.preventDefault();
        this.setState({ password: event.target.value.trim(), rePassword: "", validRePassword: false });
        this.renderValidRePassword();
        clearTimeout(this.passwordTimeOut);
        this.passwordTimeOut = setTimeout(() => {
            this.renderValidPassword();
        }, 500);
    };

    rePasswordTimeOut;
    validateRePassport = (event) => {
        event.preventDefault();
        this.setState({ rePassword: event.target.value.trim() });
        clearTimeout(this.rePasswordTimeOut);
        this.rePasswordTimeOut = setTimeout(() => {
            this.renderValidRePassword();
        }, 500);
    };

    usernameTimeOut;
    validateUsername = (event) => {
        event.preventDefault();
        this.setState({ username: event.target.value.trim() });
        clearTimeout(this.usernameTimeOut);
        this.usernameTimeOut = setTimeout(() => {
            this.renderValidUsername();
        }, 500);
    };

    validCredential() {
        return !this.state.validEmail || !this.state.validPassport || !this.state.validRePassword ? false : true;
    }

    renderCredential = () => {
        return (
            <div className="option">
                <span className="create">Create account.</span>
                <input
                    type="email"
                    className="pad"
                    value={this.state.email}
                    placeholder="Email"
                    autoComplete="off"
                    spellCheck="false"
                    ref={this.upEmail}
                    onChange={this.validateEmail}
                />
                <span className="upEmailError" ref={this.upEmailError}></span>
                <input
                    type="password"
                    className="pad"
                    value={this.state.password}
                    autoComplete="off"
                    placeholder="Password"
                    ref={this.upPassword}
                    onChange={this.validatePassport}
                />
                <span className="upPasswordError" ref={this.upPasswordError}></span>
                <input
                    type="password"
                    className="pad"
                    value={this.state.rePassword}
                    autoComplete="off"
                    placeholder="Confirm Password"
                    ref={this.upRePassword}
                    onChange={this.validateRePassport}
                />
                <span className="upRePasswordError" ref={this.upRePasswordError}></span>
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    <span>Next</span>
                    <div className="arrow arrow-right">
                        <img src={arrow} alt="arrow" />
                    </div>
                </button>
            </div>
        );
    };

    selectUsername = () => {
        return (
            <div className="option">
                <span className="select">Select username.</span>
                <input
                    type="text"
                    className="pad"
                    value={this.state.username}
                    placeholder="Username"
                    autoComplete="off"
                    ref={this.upUsername}
                    onChange={this.validateUsername}
                />
                <span className="upUsernameError"></span>
                <button type="button" onClick={this.click}>
                    <span>Back</span>
                    <div className="arrow arrow-left">
                        <img src={arrow} alt="arrow" style={{ transform: "rotate(180deg)" }} />
                    </div>
                </button>
                <button type="submit">
                    <span>Sign up</span>
                    <div className="arrow arrow-right">
                        <img src={arrow} alt="arrow" />
                    </div>
                </button>
            </div>
        );
    };

    render() {
        return (
            <div className="signup container">
                <form className="form">
                    {this.state.notSelectUsername ? this.renderCredential() : this.selectUsername()}
                </form>
                <div className="controls justify-signup">
                    <div className="ctl-signup">
                        Already have an account?
                        <button
                            type="button"
                            onClick={(event) => {
                                event.preventDefault();
                                this.props.registered(true);
                            }}
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;
