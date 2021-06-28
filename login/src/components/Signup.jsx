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

        this.test = React.createRef();
    }

    state = {
        next: true,
        email: "",
        validEmail: false,
        password: "",
        validPassword: false,
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
            this.setState({ validPassword: false });
        } else if (password.length < 6) {
            addNotValidBorder(this.upPassword.current);
            changeErrorTextColor(this.upPasswordError.current, false);
            this.upPasswordError.current.innerText = "Minumum 6 character long";
            this.setState({ validPassword: false });
        } else {
            addValidBorder(this.upPassword.current);
            changeErrorTextColor(this.upPasswordError.current, true);
            this.upPasswordError.current.innerText = "";
            this.setState({ validPassword: true });
        }
    }

    renderValidRePassword() {
        const password = this.state.password;
        const rePassword = this.state.rePassword;
        if (rePassword.length < 1) {
            addPadBorder(this.upRePassword.current);
            changeErrorTextColor(this.upRePasswordError.current, false);
            this.upRePasswordError.current.innerText = "";
            this.setState({ validRePassword: false });
        } else if (password !== rePassword) {
            addNotValidBorder(this.upRePassword.current);
            changeErrorTextColor(this.upRePasswordError.current, false);
            this.upRePasswordError.current.innerText = "Password did not match!";
            this.setState({ validRePassword: false });
        } else {
            addValidBorder(this.upRePassword.current);
            changeErrorTextColor(this.upRePasswordError.current, true);
            this.upRePasswordError.current.innerText = "";
            this.setState({ validRePassword: true });
        }
    }

    renderValidUsername = async () => {
        const username = this.state.username;

        if (this.state.username < 1) {
            addPadBorder(this.upUsername.current);
            changeErrorTextColor(this.upUsernameError.current, false);
            this.upUsernameError.current.innerText = "";
            this.setState({ validUsername: false, username: "" });
        } else if (!matchUsername(this.state.username)) {
            addNotValidBorder(this.upUsername.current);
            changeErrorTextColor(this.upUsernameError.current, false);
            this.upUsernameError.current.innerText = "Not a valid username!";
            this.setState({ validUsername: false });
        } else {
            try {
                const data = await fetchUsername(this.state.username).then((res) => res.data);
                if (data.available) {
                    addValidBorder(this.upUsername.current);
                    changeErrorTextColor(this.upUsernameError.current, true);
                    this.upUsernameError.current.innerText = "";
                    this.setState({ validUsername: true });
                } else {
                    addNotValidBorder(this.upUsername.current);
                    changeErrorTextColor(this.upUsernameError.current, false);
                    this.upUsernameError.current.innerText = "Username name is not available!";
                    this.setState({ validUsername: false });
                }
            } catch (error) {
                console.log(error);
                addNotValidBorder(this.upUsername.current);
                changeErrorTextColor(this.upUsernameError.current, false);
                this.upUsernameError.current.innerText = "Please try again later!";
                this.setState({ validUsername: false });
            }
        }
    };

    emailTimeOut;
    validateEmail = (event) => {
        event.preventDefault();
        this.setState({ email: event.target.value.trim() });
        clearTimeout(this.emailTimeOut);
        this.emailTimeOut = setTimeout(() => {
            this.renderValidEmail();
        }, 700);
    };

    passwordTimeOut;
    validatePassword = (event) => {
        event.preventDefault();
        this.setState({ password: event.target.value.trim(), rePassword: "" });
        this.renderValidRePassword();
        clearTimeout(this.passwordTimeOut);
        this.passwordTimeOut = setTimeout(() => {
            this.renderValidPassword();
        }, 700);
    };

    rePasswordTimeOut;
    validateRePassword = (event) => {
        event.preventDefault();
        this.setState({ rePassword: event.target.value.trim() });
        clearTimeout(this.rePasswordTimeOut);
        this.rePasswordTimeOut = setTimeout(() => {
            this.renderValidRePassword();
        }, 700);
    };

    usernameTimeOut;
    validateUsername = (event) => {
        event.preventDefault();
        this.setState({ username: event.target.value.trim() });
        clearTimeout(this.usernameTimeOut);
        this.usernameTimeOut = setTimeout(() => {
            this.renderValidUsername();
        }, 700);
    };

    onNext = (e) => {
        e.preventDefault();
        if (!this.state.validEmail) {
            addNotValidBorder(this.upEmail.current);
            changeErrorTextColor(this.upEmailError.current, false);
            this.upEmailError.current.innerText = "Not a valid email!";
        } else if (!this.state.validPassword) {
            addNotValidBorder(this.upPassword.current);
            changeErrorTextColor(this.upPasswordError.current, false);
            this.upPasswordError.current.innerText = "Not a valid password!";
        } else if (!this.state.rePassword) {
            addNotValidBorder(this.upRePassword.current);
            changeErrorTextColor(this.upRePasswordError.current, false);
            this.upRePasswordError.current.innerText = "Password did not match!";
        } else {
            this.setState({ next: true });
        }
    };

    onBack = (e) => {
        e.preventDefault();
        addPadBorder(this.upUsername.current);
        changeErrorTextColor(this.upUsernameError.current, false);
        this.upUsernameError.current.innerText = "";
        this.setState({ username: "", validUsername: false, next: false });
    };

    selectProfile = async (e) => {
        e.preventDefault();
    };

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
                    onChange={this.validatePassword}
                />
                <span className="upPasswordError" ref={this.upPasswordError}></span>
                <input
                    type="password"
                    className="pad"
                    value={this.state.rePassword}
                    autoComplete="off"
                    placeholder="Confirm Password"
                    ref={this.upRePassword}
                    onChange={this.validateRePassword}
                />
                <span className="upRePasswordError" ref={this.upRePasswordError}></span>
                <button type="button" onClick={this.onNext}>
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
                    autoCorrect="false"
                    ref={this.upUsername}
                    onChange={this.validateUsername}
                />
                <span className="upUsernameError" ref={this.upUsernameError}></span>
                <div className="profile">
                    <div className="pic" onClick={this.selectProfile}></div>
                    <span>Upload a profile picture</span>
                </div>
                <button type="button" onClick={this.onBack}>
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
                <form className="form">{this.state.next ? this.selectUsername() : this.renderCredential()}</form>
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
