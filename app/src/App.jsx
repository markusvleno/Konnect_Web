import "./css/base.css";
import "./css/template.css";
import React from "react";
import { connect } from "react-redux";
import { init } from "./redux/slice/user";
import { createSignalProtocolManager, SignalServerStore } from "./signal/SignalGateway";

import Logo from "./components/Logo";
import Option from "./components/Option";
import Search from "./components/Search";
import Users from "./components/Users";
import Conversation from "./components/Conversation";

import { v4 as uuid } from "uuid";

let messageSocket = null;

class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.init = this.props.init.bind(this);
        this.state = {
            SignalServer: new SignalServerStore(),
        };
    }

    async componentDidMount() {
        const response = await fetch("api/v1/user").then((res) => res.json());
        // let signal = new Signal(response.data.userId);

        createSignalProtocolManager(response.data.userId, this.state.SignalServer).then((signalProtocalManager) => {
            let userState = { ...response.data, signalProtocalManager };
            this.init(userState);
        });
    }

    render() {
        return (
            <div className="base">
                <div className="template m-menu-area">
                    <div className="btn-back"></div>
                    <div className="template-logo">
                        <Logo />
                    </div>
                    <div className="template-options">
                        <Option />
                    </div>
                    <div className="template-search">
                        <Search />
                    </div>
                    <div className="template-users">
                        <Users />
                    </div>
                    <div className="template-converstion">
                        {this.props.UI.convWindow.isSelected ? <Conversation /> : <></>}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
});

export default connect(mapStateToProps, { init })(App);
