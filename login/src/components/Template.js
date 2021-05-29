import "../css/template.css";
import React from "react";
import logo from "../images/logo.svg";
import Signin from "./Signin";
import Signup from "./Signup";

class Template extends React.Component {
    state = { registered: false };
    render() {
        return (
            <div className="container">
                <span className="heading">
                    K<img src={logo} alt="o" height="40px" width="40px" />
                    NNECT
                </span>
                {this.state.registered ? <Signin /> : <Signup />}
            </div>
        );
    }
}

export default Template;
