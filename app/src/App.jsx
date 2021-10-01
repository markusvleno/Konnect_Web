import "./css/base.css";
import "./css/template.css";
import React from "react";
import { connect } from "react-redux";
import { newMessage, init } from "./redux/slice/user";
import { createSignalProtocolManager, SignalServerStore } from "./signal/SignalGateway";
import { getConversation, putConversation } from "./utils";
import { io } from "socket.io-client";

import Logo from "./components/Logo";
import Option from "./components/Option";
import Search from "./components/Search";
import Users from "./components/Users";
import Conversation from "./components/Conversation";

// import { v4 as uuid } from "uuid";

// let messageSocket = null;

class App extends React.PureComponent {
    constructor(props) {
        super(props);

        this.init = this.props.init.bind(this);
        this.state = {
            SignalServer: new SignalServerStore(),
        };
    }

    async componentDidMount() {
        const response = await fetch("api/v1/config").then((res) => res.json());

        // socket
        let socket = new io("http://localhost:5000/chat", {
            path: "/sockets",
            autoConnect: true,
            reconnectionDelay: 1000,
            withCredentials: true,
            forceNew: false,
            reconnectionAttempts: 3,
            extraHeaders: {
                "Access-Control-Allow-Origin": "http://localhost",
            },
            query: {
                userId: response.data.userId,
            },
        });

        putConversation(response.data.userId, temp);
        const savedConv = getConversation(response.data.userId);
        createSignalProtocolManager(response.data.userId, this.state.SignalServer).then((signalProtocalManager) => {
            let userState = {
                ...response.data,
                signalProtocalManager,
                savedConv,
                socket: socket,
            };

            this.init(userState);
        });
    }

    async componentDidUpdate() {
        this.props.user.socket.on("receive-message", (data) => {
            console.log(data);
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
                        <Users convObjRef={this.convObjRef} />
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

// s:9ucmGEXOcUUINEQh4n3NN3z9qICtmfjs.aOxcRwCW/AaKb//ue+uK+XprDJ+na8qs6+QxD69wYrc
// s%3Aq-JIvrDmtZ7IjqQMbpiA3DZoSJooutFY.XcG5QsrN6RZ2dQluxyIbfJZgHT2WmOhYUJYah2uhdOY
