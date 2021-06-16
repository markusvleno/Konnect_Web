import "../css/template.css";
import React from "react";
import Signin from "./Signin";
import Signup from "./Signup";

class Template extends React.Component {
    state = { registered: true };

    changeState = (value) => {
        this.setState({ registered: value });
    };
    render() {
        return (
            <React.Fragment>
                <div className="template outer-template">
                    <div className="template inner-template"></div>
                </div>
                {this.state.registered ? (
                    <Signin changeState={this.changeState} />
                ) : (
                    <Signup changeState={this.changeState} />
                )}
            </React.Fragment>
        );
    }
}

export default Template;
