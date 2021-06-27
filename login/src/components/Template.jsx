import "../css/template.css";
import React from "react";
import Signin from "./Signin";
import Signup from "./Signup";

class Template extends React.Component {
    state = { registered: false };

    setRegister = (value) => {
        this.setState({ registered: value });
    };
    render() {
        return (
            <React.Fragment>
                <div className="template outer-template">
                    <div className="template inner-template"></div>
                </div>
                {this.state.registered ? (
                    <Signin registered={this.setRegister} />
                ) : (
                    <Signup registered={this.setRegister} />
                )}
            </React.Fragment>
        );
    }
}

export default Template;
