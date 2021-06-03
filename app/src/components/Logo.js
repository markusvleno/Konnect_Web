import React from "react";
import "../css/logo.css";
import logo from "../images/logo.svg";

class Logo extends React.Component {
    render() {
        return (
            <React.Fragment>
                <span className="logo">
                    K<img src={logo} alt="logo" />
                    NNECT
                </span>
            </React.Fragment>
        );
    }
}

export default Logo;
