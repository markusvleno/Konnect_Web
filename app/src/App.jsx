import "./css/base.css";
import "./css/template.css";
import React from "react";
import { connect } from "react-redux";
import { newMessage, init } from "./redux/slice/user";
import { openConvWindow } from "./redux/slice/UI";
import { createSignalProtocolManager, SignalServerStore } from "./signal/SignalGateway";
import { getConversation } from "./utils";
import { io } from "socket.io-client";
import axios from "axios";
import util from "./signal/helpers";

import Logo from "./components/Logo";
import Option from "./components/Option";
import Search from "./components/Search";
import Users from "./components/Users";
import Conversation from "./components/Conversation";
import AddFriend from "./components/AddFriend";
import { controlArrow } from "./images/svgs";

import { v4 as uuid } from "uuid";

// let messageSocket = null;

class App extends React.PureComponent {
    constructor(props) {
        super(props);

        this.init = this.props.init.bind(this);
        this.newMessage = this.props.newMessage.bind(this);
        this.state = {
            SignalServer: new SignalServerStore(),
        };
    }

    async componentDidMount() {
        const response = await axios
            .get("/api/v1/config", {
                headers: {
                    cookies: {
                        _token: util.getCookie("_token"),
                    },
                },
            })
            .then((res) => res.data)
            .catch((error) => console.log(error));

        // socket
        const socket = new io("/chat", {
            path: "/sockets",
            autoConnect: true,
            reconnectionDelay: 1000,
            withCredentials: true,
            forceNew: false,
            reconnectionAttempts: 3,
            // extraHeaders: {
            //     "Access-Control-Allow-Origin": "http://localhost",
            // },
            query: {
                userId: response.data.userId,
            },
        });

        const savedConv = getConversation(response.data.userId);
        createSignalProtocolManager(response.data.userId, this.state.SignalServer)
            .then((signalProtocalManager) => {
                var userState = {
                    ...response.data,
                    signalProtocalManager,
                    savedConv,
                    socket: socket,
                };

                this.init(userState);

                //incoming message listener
                socket.on("receive-message", async (_msgToSend) => {
                    if (!_msgToSend) return;

                    const decryptedMessage = await signalProtocalManager.decryptMessageAsync(
                        _msgToSend.sender.userId,
                        _msgToSend.data,
                    );

                    let msgObj = {
                        data: decryptedMessage,
                        type: _msgToSend.type,
                        time: _msgToSend.time,
                        origin: false,
                        msgId: uuid(),
                    };

                    this.newMessage({ username: _msgToSend.sender.username, msgObj: msgObj });
                });
            })
            .catch((error) => console.log(error));
    }

    render() {
        return (
            <div className="base">
                {this.props.UI.newConversationWindow.isOpen ? <AddFriend /> : <></>}
                <div className="template m-menu-area">
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
                    {this.props.UI.convWindow.isSelected ? (
                        <div className="template-converstion">
                            <>
                                <div
                                    className="backBtn"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.props.openConvWindow({ userId: null, isSelected: false });
                                    }}
                                >
                                    {controlArrow()}
                                </div>
                                <Conversation />
                            </>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
});

export default connect(mapStateToProps, { init, newMessage, openConvWindow })(App);


