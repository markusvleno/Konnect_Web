import "./css/base.css";
import React from "react";
import Template from "./components/Template";
import logo from "./images/logo.svg";

class Login extends React.Component {
    render() {
        return (
            <div className="base flex">
                <div className="logo">
                    <span className="konnect">
                        K<img src={logo} alt="logo" />
                        NNECT
                    </span>
                    <span>Chat anonymously & securly</span>
                </div>
                <Template />
            </div>
        );
    }
}

export default Login;
