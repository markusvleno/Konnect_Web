import "./css/base.css";
import React from "react";

import Template from "./components/Template";

class Login extends React.Component {
    render() {
        return (
            <div className="base bgLogo flex-center">
                <Template />
            </div>
        );
    }
}

export default Login;
