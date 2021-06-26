import "../css/style.css";
import React from "react";
import arrow from "../images/right_arrow.svg";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.upusername = React.createRef();
        this.uppassword = React.createRef();
        this.uprepassword = React.createRef();
    }

    state = { notSelectUsername: true };

    click = (event) => {
        event.preventDefault();
        this.setState({ notSelectUsername: !this.state.notSelectUsername });
    };

    validateEmail = (event) => {
        const _email = event.target.value;
    };

    renderCredential = () => {
        return (
            <div className="option">
                <span className="create">Create account.</span>
                <input type="email" placeholder="Email" onChange={this.validateEmail} />
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Confirm Password" />
                <button type="button" onClick={this.click}>
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
                <input type="text" placeholder="Username" />
                <button type="button" onClick={this.click}>
                    <span>Back</span>
                    <div className="arrow arrow-left">
                        <img src={arrow} alt="arrow" style={{ transform: "rotate(180deg)" }} />
                    </div>
                </button>
                <button type="submit" onClick={(event) => event.preventDefault()}>
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
